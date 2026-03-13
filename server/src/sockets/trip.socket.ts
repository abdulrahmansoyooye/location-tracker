import type { Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents, StartTripPayload } from "../types/socket.js"
import { startTrip, stimulateTripMovement } from "../services/trip.service.js"
type IOServer = Server<ClientToServerEvents,ServerToClientEvents>
type ClientSocket = Server<ClientToServerEvents,ServerToClientEvents>

export const initializeTripSocket = (io:IOServer)=>{
    io.on("connection", (socket:ClientSocket) =>{
    console.log("Client connected: ", socket.id)

    socket.on("trip:start",async (data:StartTripPayload )=>{
        const trip = await startTrip(
            data.pickup,
            data.drop
        )

        io.emit("trip:started",trip)


        stimulateTripMovement(trip,io)
    })

    socket.on("disconnect",()=>{
        console.log("Client Disconnected",socket.id)
    })
    })
}