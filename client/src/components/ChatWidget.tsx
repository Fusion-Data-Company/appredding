import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Send, X, MessageSquare, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Message {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
  citedDocuments?: number[] | null;
}

interface ChatSession {
  id?: number;
  sessionId: string;
  title?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  messages?: Message[];
}

const ChatWidget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [useRAG, setUseRAG] = useState<boolean>(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Query to fetch chat sessions
  const {
    data: chatSessions,
    isLoading: isLoadingSessions,
  } = useQuery({
    queryKey: ['/api/chat/sessions'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/chat/sessions');
        if (!response.ok) {
          throw new Error('Failed to fetch chat sessions');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching chat sessions:', error);
        return [];
      }
    },
    enabled: isOpen && isHistoryOpen,
  });
  
  // Query to fetch messages for the current session
  const {
    data: currentSession,
    isLoading: isLoadingMessages,
    isError: isMessagesError,
  } = useQuery({
    queryKey: ['/api/chat/sessions', currentSessionId],
    queryFn: async () => {
      if (!currentSessionId) return null;
      
      try {
        const response = await fetch(`/api/chat/sessions/${currentSessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chat session');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching chat session:', error);
        throw error;
      }
    },
    enabled: !!currentSessionId && isOpen,
  });
  
  // Mutation to create a new chat session
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const sessionId = uuidv4();
      const res = await apiRequest('POST', '/api/chat/sessions', { sessionId });
      return res.json();
    },
    onSuccess: (data) => {
      setCurrentSessionId(data.sessionId);
      queryClient.invalidateQueries({ queryKey: ['/api/chat/sessions'] });
    },
    onError: (error) => {
      toast({
        title: 'Failed to create chat session',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Mutation to send a message
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!currentSessionId) {
        throw new Error('No active chat session');
      }
      
      const res = await apiRequest('POST', '/api/chat/messages', {
        sessionId: currentSessionId,
        content,
        useRAG,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/sessions', currentSessionId] });
      setMessage('');
      
      // Focus the input field
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    },
    onError: (error) => {
      toast({
        title: 'Failed to send message',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Mutation to delete a chat session
  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await apiRequest('DELETE', `/api/chat/sessions/${sessionId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/sessions'] });
      // If we deleted the current session, create a new one
      if (currentSessionId === deleteSessionMutation.variables) {
        setCurrentSessionId(null);
        createSessionMutation.mutate();
      }
    },
    onError: (error) => {
      toast({
        title: 'Failed to delete chat session',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages]);
  
  // Create a new session when the widget is opened if there's no current session
  useEffect(() => {
    if (isOpen && !currentSessionId && !createSessionMutation.isPending) {
      createSessionMutation.mutate();
    }
  }, [isOpen, currentSessionId, createSessionMutation]);

  // Focus the input field when the chat widget is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleSendMessage = () => {
    if (message.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(message.trim());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const switchSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsHistoryOpen(false);
  };
  
  const startNewSession = () => {
    setCurrentSessionId(null);
    createSessionMutation.mutate();
    setIsHistoryOpen(false);
  };
  
  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsHistoryOpen(false);
    }
  };
  
  // Get messages for the current session or show an empty array
  const messages = currentSession?.messages || [];
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end">
      {/* Main Chat Widget */}
      {isOpen && (
        <Card className="w-[500px] h-[650px] mb-4 shadow-[0_0_40px_rgba(255,255,255,0.25)] dark:bg-gray-900/90 backdrop-blur-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 border-2 dark:border-gray-700/70">
          <CardHeader className="flex-shrink-0 border-b py-5 px-8 flex flex-row items-center justify-between bg-gradient-to-r from-blue-900/80 to-orange-900/80 shadow-md">
            <CardTitle className="text-xl font-semibold flex items-center gap-4 text-white">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,130,30,0.3)]">
                <MessageSquare className="h-5 w-5" />
              </div>
              {currentSession?.title || 'Praetorian Assistant'}
            </CardTitle>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md"
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              >
                {isHistoryOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md"
                onClick={toggleWidget}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          
          {/* Chat History Panel */}
          {isHistoryOpen && (
            <div className="absolute top-[52px] left-0 right-0 bg-card shadow-md border-b border-border z-10 max-h-[300px] overflow-y-auto animate-in slide-in-from-top duration-200">
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-foreground">Chat History</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={startNewSession}
                  >
                    New Chat
                  </Button>
                </div>
                
                {isLoadingSessions ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : chatSessions?.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No previous chats found
                  </p>
                ) : (
                  <div className="space-y-1">
                    {chatSessions?.map((session: ChatSession) => (
                      <div
                        key={session.sessionId}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-accent/50",
                          session.sessionId === currentSessionId && "bg-accent"
                        )}
                        onClick={() => switchSession(session.sessionId)}
                      >
                        <div className="truncate">
                          <p className="font-medium">
                            {session.title || 'Untitled Chat'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(session.createdAt!), 'MMM d, yyyy • h:mm a')}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSessionMutation.mutate(session.sessionId);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Messages Container - Increased height by 1.5 inches (approximately 144px at standard 96dpi) */}
          <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 h-[500px]">
            {isLoadingMessages ? (
              <div className="flex flex-col justify-center items-center h-full gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-700 to-orange-700 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <p className="text-gray-400 font-medium">Loading conversation...</p>
              </div>
            ) : isMessagesError ? (
              <div className="flex flex-col justify-center items-center h-full gap-4">
                <div className="w-16 h-16 rounded-full bg-red-700/80 flex items-center justify-center shadow-[0_0_20px_rgba(255,100,100,0.3)]">
                  <X className="h-8 w-8 text-white" />
                </div>
                <div className="bg-gray-900/90 p-5 rounded-lg border border-red-500/30 shadow-lg">
                  <p className="text-red-400 font-medium">
                    Failed to load messages. Please try again.
                  </p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full gap-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-700 to-orange-700 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-lg max-w-sm">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Welcome to Praetorian Chat
                  </h3>
                  <p className="text-gray-300 max-w-xs leading-relaxed mb-4">
                    Ask me anything about Praetorian SmartCoat products, applications, or services. I'm here to assist with technical specifications, application guides, and product recommendations.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg: Message, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-5 py-3 rounded-lg max-w-[85%] shadow-md",
                      msg.role === "user"
                        ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white"
                        : "bg-gradient-to-r from-blue-700 to-blue-600 text-white"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                  
                  {msg.role === "assistant" && msg.citedDocuments && msg.citedDocuments.length > 0 && (
                    <div className="mt-2 text-xs bg-gray-800/80 text-gray-300 px-3 py-2 rounded-md border border-blue-500/30 inline-block shadow-sm">
                      <p className="font-medium">Sources: <span className="text-blue-300">Documents {msg.citedDocuments.join(', ')}</span></p>
                    </div>
                  )}
                </div>
              ))
            )}
            {sendMessageMutation.isPending && (
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-5 py-3 rounded-lg shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-sm font-medium">Praetorian Assistant is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          {/* Input Area */}
          <CardFooter className="flex-shrink-0 border-t p-5 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-lg">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="use-rag"
                    checked={useRAG}
                    onCheckedChange={setUseRAG}
                    className="data-[state=checked]:bg-gradient-to-r from-blue-600 to-orange-600"
                  />
                  <Label htmlFor="use-rag" className="text-sm text-white/80 font-medium">
                    Use Praetorian knowledge base
                  </Label>
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={sendMessageMutation.isPending}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 py-6 rounded-lg"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-white"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
      
      {/* Chat Button */}
      <Button
        onClick={toggleWidget}
        size="icon"
        className="h-16 w-16 rounded-full dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.2)] shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-gray-200/30 dark:border-blue-600/30 flex items-center justify-center transition-all hover:scale-110 group"
      >
        <MessageSquare className="h-8 w-8 dark:text-blue-400 text-blue-600 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors" />
      </Button>
    </div>
  );
};

export default ChatWidget;