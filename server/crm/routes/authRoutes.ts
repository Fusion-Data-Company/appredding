import { Router, Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { comparePasswords } from "../auth";
import { z } from "zod";

const router = Router();

// Validate login credentials
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    
    // Check if user exists
    const user = await UserModel.getByEmail(validatedData.email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Compare passwords
    const passwordMatch = await comparePasswords(validatedData.password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Set session data
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;
    
    // Return user (without password)
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    res.status(500).json({ message: "Server error during login" });
  }
});

// Logout route
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Get current user
router.get("/me", (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  res.status(200).json({
    id: req.session.userId,
    email: req.session.userEmail,
    role: req.session.userRole
  });
});

// Change notification mode
router.post("/notification-mode", async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { mode } = req.body;
    
    // Validate mode
    if (!["in-app", "email", "console"].includes(mode)) {
      return res.status(400).json({ message: "Invalid notification mode" });
    }
    
    // Update user preference
    await UserModel.updateNotificationMode(req.session.userId, mode);
    
    res.status(200).json({ message: "Notification mode updated" });
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
});

// Update password
router.post("/update-password", async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { oldPassword, newPassword } = req.body;
    
    // Validate passwords
    if (!oldPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "Invalid password format" });
    }
    
    // Get user and verify old password
    const user = await UserModel.getById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const passwordMatch = await comparePasswords(oldPassword, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    
    // Update password
    await UserModel.updatePassword(user.id, newPassword);
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
});

export default router;