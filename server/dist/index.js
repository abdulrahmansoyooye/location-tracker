import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
// app.use(cors())
app.use(express.json());
// app.use("/api/trips".tripRoutes)
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
// initializeTripSocket(io)
// connectDatabase()
const PORT = process.env.PORT || 4000;
//# sourceMappingURL=index.js.map