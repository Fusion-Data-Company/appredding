import React, { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import ProfessionalHeader from "@/components/layout/Header";

// Form validation schema
const loginSchema = z.object({
  email: z.string()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address (e.g., admin@example.com)"),
  password: z.string()
    .min(1, "Please enter your password")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function CrmLoginPage() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Check if user is already logged in
  const { data: currentUser, isLoading: checkingAuth } = useQuery<any>({
    queryKey: ["/api/crm/auth/me"],
    retry: false
  });
  
  // Redirect if user is logged in
  React.useEffect(() => {
    if (currentUser) {
      window.location.href = "/crm";
    }
  }, [currentUser]);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await apiRequest("POST", "/api/crm/auth/login", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Login successful",
        description: "Welcome to the Praetorian CRM",
      });
      window.location.href = "/crm";
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });
  
  // Form setup
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  
  // If checking authentication, show LoadingLines
  if (checkingAuth) {
    const LoadingLines = require('@/components/ui/loading-lines').default;
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingLines />
      </div>
    );
  }
  
  // If user is already logged in, redirect (handled by the query onSuccess)
  if (currentUser) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <ProfessionalHeader />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Praetorian CRM
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your CRM dashboard
            </p>
          </div>
          
          <Card className="bg-black/40 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the CRM system
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              <p>
                Default credentials: admin@praetoriansmartcoat.com / Praetorian1$
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}