import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Upload, 
  FileText, 
  Search, 
  Bot, 
  User, 
  Send,
  Folder,
  Clock,
  Download,
  Eye,
  Archive,
  Zap
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  documentInfo?: any;
  sources?: string[];
}

interface Document {
  id: number;
  name: string;
  type: string;
  path: string;
  uploadDate: string;
  preview?: string;
}

export default function DocumentChatInterface() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get processing capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/crm/processing-capabilities'],
    staleTime: 30000
  });

  // Search documents
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['/api/crm/search-and-chat', searchQuery, chatMode],
    enabled: searchQuery.length > 2,
    select: (data) => data
  });

  // Document chat mutation
  const documentChatMutation = useMutation({
    mutationFn: async ({ documentId, question, chatHistory }: any) => {
      const response = await fetch('/api/crm/document-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, question, chatHistory })
      });
      if (!response.ok) throw new Error('Chat failed');
      return response.json();
    },
    onSuccess: (data) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        documentInfo: data.documentInfo,
        sources: data.sources
      };
      setChatMessages(prev => [...prev, newMessage]);
    },
    onError: () => {
      toast({
        title: "Chat Error",
        description: "Failed to get response from document",
        variant: "destructive"
      });
    }
  });

  // Search and chat mutation
  const searchChatMutation = useMutation({
    mutationFn: async ({ query, chatMode }: any) => {
      const response = await fetch('/api/crm/search-and-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, chatMode })
      });
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    onSuccess: (data) => {
      if (data.chatResponse) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.chatResponse,
          timestamp: new Date(),
          sources: data.documents?.map((doc: any) => `Document: ${doc.name}`)
        };
        setChatMessages(prev => [...prev, newMessage]);
      }
    }
  });

  // Document upload mutation with large file support
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/crm/process-any-document', {
        method: 'POST',
        body: formData,
        // Remove default timeout for large files
        signal: AbortSignal.timeout(300000) // 5 minute timeout for large files
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Document Processed",
        description: `Successfully processed ${data.documentType} document with AI analysis`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/search-and-chat'] });
      setIsUploading(false);
      setUploadProgress(0);
    },
    onError: () => {
      toast({
        title: "Upload Failed",
        description: "Failed to process document",
        variant: "destructive"
      });
      setIsUploading(false);
      setUploadProgress(0);
    }
  });

  // Folder upload mutation
  const folderUploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/crm/process-folder', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Folder upload failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Folder Processed",
        description: `Successfully processed ${data.data.successfulFiles} documents from folder`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/search-and-chat'] });
      setIsUploading(false);
      setUploadProgress(0);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);

    if (selectedDocument) {
      // Chat with specific document
      documentChatMutation.mutate({
        documentId: selectedDocument.id,
        question: currentMessage,
        chatHistory: chatMessages
      });
    } else {
      // Search and chat across all documents
      searchChatMutation.mutate({
        query: currentMessage,
        chatMode: true
      });
    }

    setCurrentMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Maximum file size is 100MB. Please select a smaller file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('uploadedBy', 'document_chat_user');

    // Realistic progress simulation for large files
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + (file.size > 10 * 1024 * 1024 ? 5 : 15); // Slower for large files
      });
    }, file.size > 10 * 1024 * 1024 ? 500 : 200);

    uploadMutation.mutate(formData);
    
    // Clear progress interval when mutation completes
    setTimeout(() => clearInterval(progressInterval), 30000);
  };

  const handleFolderUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('folder', file);
    formData.append('uploadedBy', 'document_chat_user');

    folderUploadMutation.mutate(formData);
  };

  const handleSearch = () => {
    if (searchQuery.length > 2) {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/crm/search-and-chat', searchQuery, chatMode] 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <MessageCircle className="inline-block mr-3 text-green-600" />
            Document Chat Interface
          </h1>
          <p className="text-lg text-gray-600">
            Chat with your documents, upload new files, and get instant answers from your 25+ years of business data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Upload & Search */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-yellow-100">
                <CardTitle className="flex items-center text-green-800">
                  <Upload className="mr-2" size={20} />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isUploading}
                  >
                    <FileText className="mr-2" size={16} />
                    Upload Document
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.dwg,.dxf,.zip"
                  />
                </div>

                <div>
                  <Button 
                    onClick={() => folderInputRef.current?.click()}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isUploading}
                  >
                    <Folder className="mr-2" size={16} />
                    Upload Folder/ZIP
                  </Button>
                  <input
                    ref={folderInputRef}
                    type="file"
                    onChange={handleFolderUpload}
                    className="hidden"
                    accept=".zip"
                  />
                </div>

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                {capabilities && (
                  <div className="mt-4 text-xs text-gray-600">
                    <div className="font-semibold mb-1">Supported Files:</div>
                    <div className="flex flex-wrap gap-1">
                      {Object.values(capabilities.supportedFileTypes).flat().map((type: string) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Document Search */}
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                <CardTitle className="flex items-center text-blue-800">
                  <Search className="mr-2" size={20} />
                  Search Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    onClick={handleSearch}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Search size={16} />
                  </Button>
                </div>

                {isSearching && (
                  <div className="text-center text-sm text-gray-500">Searching...</div>
                )}

                {searchResults?.documents && (
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {searchResults.documents.map((doc: Document) => (
                        <div
                          key={doc.id}
                          className={`p-2 rounded cursor-pointer border ${
                            selectedDocument?.id === doc.id 
                              ? 'bg-blue-100 border-blue-300' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <div className="font-medium text-sm truncate">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.type}</div>
                          {doc.preview && (
                            <div className="text-xs text-gray-400 mt-1 truncate">
                              {doc.preview}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col border-gray-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 border-b">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="mr-2 text-green-600" size={24} />
                    {selectedDocument ? (
                      <div>
                        <div className="font-semibold">Chatting with: {selectedDocument.name}</div>
                        <div className="text-sm text-gray-600">{selectedDocument.type}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold">Chat with All Documents</div>
                        <div className="text-sm text-gray-600">Ask questions across your entire document collection</div>
                      </div>
                    )}
                  </div>
                  {selectedDocument && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDocument(null)}
                    >
                      Chat with All Documents
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
                        <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                        <p className="text-sm">
                          {selectedDocument 
                            ? `Ask questions about "${selectedDocument.name}"`
                            : "Search and ask questions about any of your documents"
                          }
                        </p>
                        <div className="mt-4 text-xs text-gray-400">
                          Try asking: "What's the customer's address?", "What was the total cost?", "When was this installed?"
                        </div>
                      </div>
                    )}

                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="flex items-start gap-2">
                            {message.role === 'assistant' ? (
                              <Bot size={16} className="mt-0.5 text-green-600" />
                            ) : (
                              <User size={16} className="mt-0.5" />
                            )}
                            <div className="flex-1">
                              <div className="whitespace-pre-wrap">{message.content}</div>
                              
                              {message.documentInfo && (
                                <div className="mt-2 p-2 bg-white bg-opacity-20 rounded text-xs">
                                  <div className="font-semibold">Document: {message.documentInfo.documentName}</div>
                                  <div>Location: {message.documentInfo.documentPath}</div>
                                </div>
                              )}
                              
                              {message.sources && (
                                <div className="mt-2 text-xs opacity-75">
                                  Sources: {message.sources.join(', ')}
                                </div>
                              )}
                              
                              <div className="text-xs opacity-75 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder={selectedDocument 
                        ? `Ask about ${selectedDocument.name}...` 
                        : "Ask questions about your documents..."
                      }
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={documentChatMutation.isPending || searchChatMutation.isPending}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || documentChatMutation.isPending || searchChatMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Zap className="mx-auto mb-2 text-green-600" size={24} />
              <div className="font-semibold text-sm">Quick Analysis</div>
              <div className="text-xs text-gray-500">Get instant document insights</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Archive className="mx-auto mb-2 text-blue-600" size={24} />
              <div className="font-semibold text-sm">Bulk Processing</div>
              <div className="text-xs text-gray-500">Process multiple documents</div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Eye className="mx-auto mb-2 text-purple-600" size={24} />
              <div className="font-semibold text-sm">Document Viewer</div>
              <div className="text-xs text-gray-500">View and analyze documents</div>
            </CardContent>
          </Card>
          
          <Card className="border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Download className="mx-auto mb-2 text-red-600" size={24} />
              <div className="font-semibold text-sm">Export Data</div>
              <div className="text-xs text-gray-500">Download analysis results</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}