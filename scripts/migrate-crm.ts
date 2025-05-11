// Script to push the CRM schema to the database
import { db } from "../server/db";
import * as schema from "../shared/crm-schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

async function runMigration() {
  console.log("Migrating CRM schema to database...");
  
  try {
    // Create role enum if it doesn't exist
    await db.execute(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
          CREATE TYPE role AS ENUM ('admin', 'sales');
        END IF;
      END
      $$;
    `);
    
    // Create notification_mode enum if it doesn't exist
    await db.execute(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_mode') THEN
          CREATE TYPE notification_mode AS ENUM ('in-app', 'email', 'console');
        END IF;
      END
      $$;
    `);
    
    // Create crm_users table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS crm_users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role role NOT NULL DEFAULT 'sales',
        notification notification_mode NOT NULL DEFAULT 'in-app'
      );
    `);
    
    // Create inventory table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL UNIQUE,
        quantity INTEGER NOT NULL DEFAULT 0
      );
    `);
    
    // Create crm_orders table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS crm_orders (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES inventory(id),
        quantity INTEGER NOT NULL,
        confirmed BOOLEAN NOT NULL DEFAULT false,
        ordered_by INTEGER REFERENCES crm_users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log("CRM schema migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

runMigration();