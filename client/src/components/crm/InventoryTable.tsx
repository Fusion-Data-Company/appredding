import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Inventory } from "@shared/crm-schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface InventoryTableProps {
  isAdmin: boolean;
}

export function InventoryTable({ isAdmin }: InventoryTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State for restock dialog
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(0);
  
  // Query to fetch inventory
  const {
    data: inventory,
    isLoading,
    error,
    refetch
  } = useQuery<Inventory[]>({
    queryKey: ["/api/crm/inventory"],
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: 1000
  });
  
  // Effect to attempt a refetch on initial error
  useEffect(() => {
    // Log error and attempt to refetch
    if (error) {
      console.error("Error fetching inventory:", error);
      
      // Attempt to refetch after a delay
      const timer = setTimeout(() => {
        refetch();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [error, refetch]);
  
  // Mutation to restock inventory (admin only)
  const restockMutation = useMutation({
    mutationFn: async ({ id, amount }: { id: number; amount: number }) => {
      const response = await apiRequest("POST", `/api/crm/inventory/${id}/restock`, { amount });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to restock inventory");
      }
      return response.json();
    },
    onSuccess: () => {
      // Close dialog and reset values
      setIsRestockOpen(false);
      setSelectedItemId(null);
      setRestockAmount(0);
      
      // Refetch inventory data
      queryClient.invalidateQueries({ queryKey: ["/api/crm/inventory"] });
      
      toast({
        title: "Inventory restocked",
        description: "The inventory has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Restock failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle restock dialog open
  const handleRestockClick = (id: number) => {
    setSelectedItemId(id);
    setIsRestockOpen(true);
  };
  
  // Handle restock submit
  const handleRestockSubmit = () => {
    if (selectedItemId && restockAmount > 0) {
      restockMutation.mutate({ id: selectedItemId, amount: restockAmount });
    } else {
      toast({
        title: "Invalid input",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
    }
  };
  
  // Determine if a quantity is low (20 or less)
  const isLowStock = (quantity: number) => quantity <= 20;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading inventory data. Please try again.
      </div>
    );
  }
  
  return (
    <div>
      <Table>
        <TableCaption>Current Inventory Status</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((item) => (
            <TableRow 
              key={item.id}
              className={isLowStock(item.quantity) ? "bg-red-50 dark:bg-red-950/20" : ""}
            >
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell className="text-right">
                {isLowStock(item.quantity) ? (
                  <Badge variant="destructive" className="font-bold">
                    {item.quantity}
                  </Badge>
                ) : (
                  item.quantity
                )}
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    onClick={() => handleRestockClick(item.id)}
                    size="sm"
                  >
                    Restock
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Inventory</DialogTitle>
            <DialogDescription>
              Enter the amount you want to add to the current stock.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right col-span-1">
                Amount:
              </label>
              <Input
                id="amount"
                type="number"
                value={restockAmount}
                onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                min="1"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestockOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRestockSubmit} 
              disabled={restockMutation.isPending || restockAmount <= 0}
            >
              {restockMutation.isPending ? "Processing..." : "Restock"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}