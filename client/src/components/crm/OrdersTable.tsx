import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CrmOrder, Inventory } from "@shared/crm-schema";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, Clock } from "lucide-react";

interface OrdersTableProps {
  userId: number;
  isAdmin: boolean;
}

export function OrdersTable({ userId, isAdmin }: OrdersTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get all orders or just the user's orders
  const ordersUrl = isAdmin ? "/api/crm/orders" : `/api/crm/orders/user/${userId}`;
  
  // Query to fetch orders
  const {
    data: orders,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery<CrmOrder[]>({
    queryKey: [ordersUrl],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
  
  // Query to fetch inventory for product names
  const {
    data: inventory,
    isLoading: isLoadingInventory,
  } = useQuery<Inventory[]>({
    queryKey: ["/api/crm/inventory"],
  });
  
  // Mutation to confirm an order
  const confirmOrderMutation = useMutation({
    mutationFn: async (orderId: number) => {
      const response = await apiRequest("POST", `/api/crm/orders/${orderId}/confirm`, {});
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to confirm order");
      }
      return response.json();
    },
    onSuccess: () => {
      // Refetch orders and inventory after confirmation
      queryClient.invalidateQueries({ queryKey: [ordersUrl] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/inventory"] });
      
      toast({
        title: "Order confirmed",
        description: "The order has been confirmed and inventory updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Confirmation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Get product name from inventory
  const getProductName = (productId: number | null): string => {
    if (!productId) return "Unknown Product";
    
    const product = inventory?.find((item) => item.id === productId);
    return product ? product.productName : "Unknown Product";
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  if (isLoadingOrders || isLoadingInventory) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (ordersError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading orders data. Please try again.
      </div>
    );
  }
  
  return (
    <div>
      <Table>
        <TableCaption>Order History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {getProductName(order.productId)}
                </TableCell>
                <TableCell className="text-right">{order.quantity}</TableCell>
                <TableCell>
                  {order.confirmed ? (
                    <Badge variant="default" className="bg-orange-500 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Confirmed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {order.createdAt ? formatDate(new Date(order.createdAt).toISOString()) : 'N/A'}
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    {!order.confirmed && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => confirmOrderMutation.mutate(order.id)}
                        disabled={confirmOrderMutation.isPending}
                      >
                        {confirmOrderMutation.isPending &&
                        confirmOrderMutation.variables === order.id ? (
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        ) : null}
                        Confirm
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-4">
                No orders found. Create a new order to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}