import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDatabase } from "./config/database.js";
import cors from "cors";
import dotenv from "dotenv";
import tripRoutes from "./routes/trips.routes.js";
import { initializeTripSocket } from "./sockets/trip.socket.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./types/socket.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/trips", tripRoutes);

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
        origin: "*"
    }
});

initializeTripSocket(io)

connectDatabase()

const PORT = process.env.PORT || 4000

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

