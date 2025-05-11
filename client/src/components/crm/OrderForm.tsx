import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Inventory } from "@shared/crm-schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Order form schema
const orderSchema = z.object({
  productId: z.string().refine(val => !isNaN(parseInt(val)), {
    message: "Please select a product",
  }),
  quantity: z.number().positive({
    message: "Quantity must be positive",
  }),
  confirmed: z.boolean().default(false),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  userId: number;
  onOrderPlaced?: () => void;
}

export function OrderForm({ userId, onOrderPlaced }: OrderFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form setup
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
      confirmed: false,
    },
  });
  
  // Query to fetch inventory for product selection
  const {
    data: inventory,
    isLoading: isLoadingInventory,
  } = useQuery<Inventory[]>({
    queryKey: ["/api/crm/inventory"],
  });
  
  // Create order mutation
  const orderMutation = useMutation({
    mutationFn: async (values: OrderFormValues) => {
      const orderData = {
        productId: parseInt(values.productId),
        quantity: values.quantity,
        confirmed: values.confirmed,
        orderedBy: userId,
      };
      
      const response = await apiRequest("POST", "/api/crm/orders", orderData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      
      // Refetch inventory to get updated quantities
      queryClient.invalidateQueries({ queryKey: ["/api/crm/inventory"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/orders"] });
      
      toast({
        title: "Order placed successfully",
        description: "Your order has been submitted",
      });
      
      if (onOrderPlaced) {
        onOrderPlaced();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Order failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle form submission
  const onSubmit = (values: OrderFormValues) => {
    orderMutation.mutate(values);
  };
  
  // Get selected product details
  const selectedProductId = form.watch("productId");
  const selectedProduct = inventory?.find(
    (item) => item.id === parseInt(selectedProductId)
  );
  
  // Update form when selected product changes
  useEffect(() => {
    // If product has low stock, set default quantity to available amount or 1
    if (selectedProduct && selectedProduct.quantity < form.getValues("quantity")) {
      form.setValue("quantity", Math.max(1, selectedProduct.quantity));
    }
  }, [selectedProductId, form, selectedProduct]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Order</CardTitle>
        <CardDescription>
          Place an order for SmartCoat products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoadingInventory || orderMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingInventory ? (
                        <SelectItem value="loading" disabled>
                          Loading products...
                        </SelectItem>
                      ) : (
                        inventory?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.productName} ({item.quantity} available)
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={selectedProduct?.quantity || 1000}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      disabled={!selectedProductId || orderMutation.isPending}
                    />
                  </FormControl>
                  {selectedProduct && (
                    <FormDescription>
                      Available: {selectedProduct.quantity} units
                      {selectedProduct.quantity <= 20 && (
                        <span className="text-red-500 ml-2">
                          (Low stock)
                        </span>
                      )}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={orderMutation.isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Confirm immediately</FormLabel>
                    <FormDescription>
                      If checked, stock will be deducted immediately from inventory
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full"
              disabled={
                orderMutation.isPending || 
                !selectedProductId || 
                (!!selectedProduct && form.getValues("quantity") > selectedProduct.quantity)
              }
            >
              {orderMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}