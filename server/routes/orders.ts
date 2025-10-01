import { Router } from "express";
import { storage } from "../storage";
import { z } from "zod";

const router = Router();

function generateOrderNumber(): string {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = now.getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `APR-${month}-${year}-${random}`;
}

const createOrderSchema = z.object({
  email: z.string().email("Valid email is required"),
  customerId: z.number().optional(),
  items: z.array(z.object({
    productId: z.number().optional(),
    sku: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().positive(),
    subtotal: z.number()
  })).min(1, "At least one item is required"),
  shippingAddress: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(2),
    zip: z.string().regex(/^\d{5}$/),
    phone: z.string().min(10)
  }),
  billingAddress: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(2),
    zip: z.string().regex(/^\d{5}$/),
    phone: z.string().min(10)
  }).optional(),
  paymentMethod: z.enum(['credit_card', 'paypal', 'check', 'financing']),
  notes: z.string().optional()
});

router.post("/api/orders/create", async (req, res) => {
  try {
    const validatedData = createOrderSchema.parse(req.body);
    
    const subtotal = validatedData.items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = Number((subtotal * 0.0775).toFixed(2));
    const shipping = subtotal > 100 ? 0 : 15.00;
    const total = Number((subtotal + tax + shipping).toFixed(2));
    
    const orderNumber = generateOrderNumber();
    
    const orderData = {
      orderNumber,
      customerId: validatedData.customerId || null,
      email: validatedData.email,
      status: 'pending',
      subtotal: subtotal.toString(),
      tax: tax.toString(),
      shipping: shipping.toString(),
      total: total.toString(),
      shippingAddress: validatedData.shippingAddress,
      billingAddress: validatedData.billingAddress || null,
      paymentMethod: validatedData.paymentMethod,
      paymentStatus: 'pending',
      notes: validatedData.notes || null
    };

    const order = await storage.createOrder(orderData, validatedData.items);
    
    res.json({ 
      success: true, 
      order,
      orderNumber: order.orderNumber
    });
  } catch (error) {
    console.error('Order creation error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        error: "Validation error", 
        details: error.errors 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: "Failed to create order" 
      });
    }
  }
});

router.get("/api/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await storage.getOrderById(id);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        error: "Order not found" 
      });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to retrieve order" 
    });
  }
});

router.get("/api/orders/number/:orderNumber", async (req, res) => {
  try {
    const orderNumber = req.params.orderNumber;
    const order = await storage.getOrderByNumber(orderNumber);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        error: "Order not found" 
      });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    console.error('Get order by number error:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to retrieve order" 
    });
  }
});

router.get("/api/orders/customer/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await storage.getOrdersByEmail(email);
    
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get customer orders error:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to retrieve orders" 
    });
  }
});

router.post("/api/orders/:id/payment", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { paymentMethod } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await storage.updateOrderPaymentStatus(id, 'captured');
    await storage.updateOrderStatus(id, 'processing');
    
    const order = await storage.getOrderById(id);
    
    res.json({ 
      success: true, 
      order,
      message: "Payment processed successfully"
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      error: "Payment processing failed" 
    });
  }
});

export default router;
