import Trip from "../models/Trip.js";
import { saveLocation } from "../repositories/location.repository.js";
import { generateSteps } from "../utils/movement.js";
import { Server } from "socket.io";
export const startTrip = async (pickup, drop) => {
    const trip = await Trip.create({
        pickup,
        drop,
        status: "moving"
    });
    return {
        _id: trip._id.toString(),
        pickup: trip.pickup,
        drop: trip.drop,
        status: trip.status
    };
};
export const stimulateTripMovement = async (trip, io) => {
    const path = generateSteps(trip.pickup, trip.drop);
    let index = 0;
    const interval = setInterval(async () => {
        if (index >= path.length) {
            clearInterval(interval);
            io.emit("trip:end", {
                tripId: trip._id
            });
            return;
        }
        const location = path[index];
        if (!location) {
            clearInterval(interval);
            return;
        }
        if (trip._id) {
            await saveLocation(trip._id, location.lat, location.lng);
        }
        io.emit("driver:move", {
            tripId: trip._id,
            lat: location.lat,
            lng: location.lng
        });
        index++;
    }, 1000);
};
//# sourceMappingURL=trip.service.js.map