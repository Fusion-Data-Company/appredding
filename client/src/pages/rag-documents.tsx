import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState, useEffect } from "react";
import { Loader2, Plus, File, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertRagDocumentSchema } from "../../../shared/schema";

// Extend the insert schema with our form validations
const documentFormSchema = insertRagDocumentSchema
  .extend({
    title: z.string().min(3, {
      message: "Title must be at least 3 characters long",
    }),
    content: z.string().min(10, {
      message: "Content must be at least 10 characters long",
    }),
  })
  .omit({ createdBy: true });

type DocumentFormValues = z.infer<typeof documentFormSchema>;

const RAGDocumentsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<any | null>(null);

  // Form setup
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "",
      content: "",
      source: "",
      category: "",
      metadata: {},
    },
  });

  const editForm = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "",
      content: "",
      source: "",
      category: "",
      metadata: {},
    },
  });

  useEffect(() => {
    if (currentDocument && isEditOpen) {
      editForm.reset({
        title: currentDocument.title,
        content: currentDocument.content,
        source: currentDocument.source || "",
        category: currentDocument.category || "",
        metadata: currentDocument.metadata || {},
      });
    }
  }, [currentDocument, isEditOpen, editForm]);

  // Query to fetch all documents
  const {
    data: documents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["/api/rag/documents"],
    queryFn: async () => {
      const response = await fetch("/api/rag/documents");
      if (!response.ok) {
        throw new Error("Failed to fetch RAG documents");
      }
      return response.json();
    },
  });

  // Mutation to create a new document
  const createMutation = useMutation({
    mutationFn: async (values: DocumentFormValues) => {
      const res = await apiRequest("POST", "/api/rag/documents", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Document created",
        description: "The document has been successfully created and indexed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/rag/documents"] });
      setIsCreateOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to create document",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to update a document
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: DocumentFormValues }) => {
      const res = await apiRequest("PUT", `/api/rag/documents/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Document updated",
        description: "The document has been successfully updated and re-indexed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/rag/documents"] });
      setIsEditOpen(false);
      setCurrentDocument(null);
      editForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to update document",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to delete a document
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/rag/documents/${id}`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted from the knowledge base.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/rag/documents"] });
      setIsDeleteOpen(false);
      setCurrentDocument(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete document",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handler for form submission
  const onCreateSubmit = (values: DocumentFormValues) => {
    createMutation.mutate(values);
  };

  // Handler for edit form submission
  const onEditSubmit = (values: DocumentFormValues) => {
    if (currentDocument) {
      updateMutation.mutate({ id: currentDocument.id, data: values });
    }
  };

  // Handler for delete confirmation
  const onDeleteConfirm = () => {
    if (currentDocument) {
      deleteMutation.mutate(currentDocument.id);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">RAG Knowledge Base</h1>
            <p className="text-muted-foreground mt-1">
              Manage documents that the AI chatbot can reference when answering user queries.
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Add New Document</DialogTitle>
                <DialogDescription>
                  Add a document to the knowledge base for the AI chatbot to reference.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Document title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Where this document is from" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Document category" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Document content"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending}>
                      {createMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                        </>
                      ) : (
                        "Create Document"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <CardContent className="pt-6">
              <p className="text-red-600 dark:text-red-400">
                Failed to load documents. Please try again later.
              </p>
            </CardContent>
          </Card>
        ) : documents?.length === 0 ? (
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center h-64">
              <File className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-4">
                No documents found in the knowledge base.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(true)}
                className="gap-2"
              >
                <Plus size={16} />
                Add Your First Document
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc: any) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>{doc.category || "—"}</TableCell>
                      <TableCell>{doc.source || "—"}</TableCell>
                      <TableCell>
                        {format(new Date(doc.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentDocument(doc);
                              setIsEditOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentDocument(doc);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
              <DialogDescription>
                Update the document in the knowledge base.
              </DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Document title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Where this document is from" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Document category" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={editForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Document content"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditOpen(false);
                      setCurrentDocument(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                      </>
                    ) : (
                      "Update Document"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Document</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this document? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setCurrentDocument(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={onDeleteConfirm}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default RAGDocumentsPage;