import { startTrip, stimulateTripMovement } from "../services/trip.service.js";
export const initializeTripSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected: ", socket.id);
        socket.on("trip:start", async (data) => {
            const trip = await startTrip(data.pickup, data.drop);
            io.emit("trip:started", trip);
            stimulateTripMovement(trip, io);
        });
        socket.on("disconnect", () => {
            console.log("Client Disconnected", socket.id);
        });
    });
};
//# sourceMappingURL=trip.socket.js.map