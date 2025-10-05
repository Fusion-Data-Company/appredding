import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupCompressionMiddleware } from "./middleware/compression-middleware";
import { securityHeadersMiddleware } from "./middleware/security-headers";
import { cachingMiddleware, etagMiddleware } from "./middleware/caching";
import { 
  performanceMonitoringMiddleware, 
  productionLoggingMiddleware,
  errorHandlingMiddleware 
} from "./middleware/performance";
import crmRoutes from "./routes/crmFixed";

const app = express();

// Disable X-Powered-By header globally for security
app.disable('x-powered-by');

// MIDDLEWARE ORDERING (critical for proper function):
// 1. Security headers - MUST be first to protect all responses
app.use(securityHeadersMiddleware);

// 2. Performance monitoring - track all request response times
app.use(performanceMonitoringMiddleware);

// 3. Production logging - log errors only in production
app.use(productionLoggingMiddleware);

// 4. Body parsers with size limits - protect against large payloads
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 6. Compression - MUST be before routes and static serving
setupCompressionMiddleware(app);

// 7. Caching strategy - intelligent cache headers for all resources
app.use(cachingMiddleware);
app.use(etagMiddleware);

// 8. CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Add CRM routes
app.use("/api/crm", crmRoutes);

// Add Financial Operations routes
import financialRoutes from "./routes/financial";
app.use("/api/financial", financialRoutes);

// Add Document Management routes
import documentRoutes from "./routes/documents";
app.use("/api/documents", documentRoutes);

// Add Data Processing routes
import dataProcessingRoutes from "./routes/dataProcessing";
app.use("/api/data-processing", dataProcessingRoutes);

(async () => {
  await registerRoutes(app);

  // Error handling middleware - MUST be last
  app.use(errorHandlingMiddleware);

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  const server = app.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
})();
