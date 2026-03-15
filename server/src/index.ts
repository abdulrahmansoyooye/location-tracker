import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import { connectDatabase } from "./config/database.js";
import tripRoutes from "./routes/trips.routes.js";
import { initializeTripSocket } from "./sockets/trip.socket.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./types/socket.js";

// Load environment variables
dotenv.config();

const app: Express = express();

/**
 * ==========================================================
 * MIDDLEWARES & SECURITY
 * ==========================================================
 */

// Set up security headers
// Using helmet enhances API security by setting various HTTP headers
app.use(helmet());

// Enable gzip compression for optimized response sizes
app.use(compression());

// Set up Cross-Origin Resource Sharing (CORS)
const corsOptions = {
    origin: process.env.CLIENT_URL || "*", // Fallback to '*' if CLIENT_URL is not set
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};
app.use(cors(corsOptions));

// HTTP request logger middleware
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat));

// Body parsing middleware with payload limits to prevent DOS attacks
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/**
 * ==========================================================
 * ROUTES
 * ==========================================================
 */

// Health check endpoint for monitoring/load balancers
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Primary API routes
app.use("/api/trips", tripRoutes);

// 404 Catcher for undefined routes
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found", message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Global Error]: ${err.message}`);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "production" ? "Something went wrong. Please try again later." : err.message,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
});

/**
 * ==========================================================
 * SERVER & SOCKET INITIALIZATION
 * ==========================================================
 */

const server = http.createServer(app);

// Initialize Socket.io Server
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
    pingTimeout: 60000, // Optional scaling enhancements (e.g. mobile client disconnects)
});

// Bind sockets to the implementation logic
initializeTripSocket(io);

/**
 * ==========================================================
 * BOOTSTRAP PROCESS
 * ==========================================================
 */

const startServer = async () => {
    try {
        // Enforce database connection before starting the server
        console.log("Connecting to database...");
        await connectDatabase();
        
        const PORT = process.env.PORT || 4000;
        const NODE_ENV = process.env.NODE_ENV || "development";
        
        server.listen(PORT, () => {
            console.log(`🚀 Server successfully running in ${NODE_ENV} mode on port ${PORT}`);
        });

        // Graceful shutdown function to properly close server and database connections
        const gracefulShutdown = () => {
            console.log("\n🛑 Received kill signal, shutting down gracefully...");
            
            server.close(() => {
                console.log("🔒 HTTP server closed.");
                // Note: Optional mongoose connection closure goes here
                process.exit(0);
            });

            // Force shutdown if connections do not close in time
            setTimeout(() => {
                console.error("💥 Could not close connections in time, forcefully shutting down.");
                process.exit(1);
            }, 10000);
        };

        // Listen for OS signals to trigger graceful shutdown
        process.on("SIGINT", gracefulShutdown);
        process.on("SIGTERM", gracefulShutdown);

    } catch (error) {
        console.error("❌ Failed to start the server:", error);
        // Exit process if the database connection or bootstrap fails
        process.exit(1);
    }
};

startServer();
