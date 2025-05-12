import { Request, Response } from "express";
import { storage } from "../storage";
import { insertTaskSchema } from "@shared/schema";
import { z } from "zod";

// Get all tasks with optional filters
export async function getTasks(req: Request, res: Response) {
  try {
    const assignedToId = req.query.assignedTo ? Number(req.query.assignedTo) : undefined;
    const status = req.query.status as string | undefined;
    
    const tasks = await storage.getTasks(assignedToId, status);
    
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

// Get a task by ID
export async function getTaskById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    
    const task = await storage.getTask(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
}

// Create a new task
export async function createTask(req: Request, res: Response) {
  try {
    const taskData = insertTaskSchema.parse(req.body);
    
    const task = await storage.createTask(taskData);
    
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid task data", errors: error.errors });
    }
    
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
}

// Update an existing task
export async function updateTask(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    
    const task = await storage.getTask(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    const taskData = req.body;
    
    const updatedTask = await storage.updateTask(id, taskData);
    
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
}

// Mark a task as completed
export async function completeTask(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    
    const task = await storage.getTask(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    const updatedTask = await storage.updateTask(id, {
      status: "completed",
      completedDate: new Date(),
    });
    
    res.json(updatedTask);
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ message: "Failed to complete task" });
  }
}

// Delete a task
export async function deleteTask(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    
    const task = await storage.getTask(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    const result = await storage.deleteTask(id);
    
    if (result) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete task" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
}