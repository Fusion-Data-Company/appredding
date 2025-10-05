import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Loader2, 
  Send, 
  MessageSquare,
  Trash2, 
  FileText,
  Info,
  Calendar
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
};

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

const ChatPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string>('');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [useRAG, setUseRAG] = useState<boolean>(true);
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
        
        return [];
      }
    },
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
        
        throw error;
      }
    },
    enabled: !!currentSessionId,
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
  
  // Create a new session if there's no current session
  useEffect(() => {
    if (!currentSessionId && !createSessionMutation.isPending) {
      createSessionMutation.mutate();
    }
  }, [currentSessionId, createSessionMutation]);

  // Focus the input field initially
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
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
  };
  
  const startNewSession = () => {
    setCurrentSessionId(null);
    createSessionMutation.mutate();
  };
  
  // Get messages for the current session or show an empty array
  const messages = currentSession?.messages || [];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline" 
                    size="sm"
                    className="w-full justify-start gap-2" 
                    onClick={startNewSession}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>New Chat</span>
                  </Button>

                  {isLoadingSessions ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : chatSessions?.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No previous chats found
                    </p>
                  ) : (
                    <div className="space-y-1 mt-4">
                      {chatSessions?.map((session: ChatSession) => (
                        <div
                          key={session.sessionId}
                          className={cn(
                            "flex items-center justify-between rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-accent/50",
                            session.sessionId === currentSessionId && "bg-accent"
                          )}
                          onClick={() => switchSession(session.sessionId)}
                        >
                          <div className="truncate mr-2">
                            <p className="font-medium">
                              {session.title || 'Untitled Chat'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(session.createdAt!), 'MMM d, yyyy')}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-50 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSessionMutation.mutate(session.sessionId);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 space-y-4">
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Tools</p>
                    <Link href="/rag-documents">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start gap-2 mb-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Manage Knowledge Base</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="md:w-3/4">
            <Card className="flex flex-col h-[calc(100vh-12rem)]">
              <CardHeader className="pb-3 border-b">
                <CardTitle>
                  {currentSession?.title || 'New Chat'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {isLoadingMessages || !currentSessionId ? (
                  <div className="flex justify-center items-center h-full">
                    {(() => { const LoadingLines = require('@/components/ui/loading-lines').default; return <LoadingLines />; })()}
                  </div>
                ) : isMessagesError ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-destructive">
                      Failed to load messages. Please try again.
                    </p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-full gap-4 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        Welcome to Praetorian Chat
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Ask me anything about Advance Power products, applications, or services! I'm here to assist with any questions about our industrial coating solutions.
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
                          "px-4 py-2 rounded-lg max-w-[80%]",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      
                      {msg.role === "assistant" && msg.citedDocuments && msg.citedDocuments.length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          <p>Sources: Documents {msg.citedDocuments.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {sendMessageMutation.isPending && (
                  <div className="flex items-start">
                    <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="border-t p-4 bg-background">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="use-rag"
                        checked={useRAG}
                        onCheckedChange={setUseRAG}
                      />
                      <Label htmlFor="use-rag" className="text-xs">
                        Use knowledge base
                      </Label>
                    </div>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={sendMessageMutation.isPending || !currentSessionId}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || sendMessageMutation.isPending || !currentSessionId}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;