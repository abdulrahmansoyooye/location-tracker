import Trip from "../models/Trip.js";
import { saveLocation } from "../repositories/location.repository.js";
import type { Coordinates, TripType, } from "../types/socket.js";
import { generateSteps } from "../utils/movement.js";

export const startTrip = async (pickup: Coordinates, drop: Coordinates): Promise<TripType> => {
    const trip: TripType = await Trip.create({
        pickup,
        drop,
        status: "moving"
    })

    return trip
}


export const stimulateTripMovement = async (trip: TripType, io: any) => {
    const path = generateSteps(trip.pickup, trip.drop)
    let index = 0

    const interval = setInterval(async () => {
        if (index >= path.length) {
            clearInterval(interval)

            io.emit("trip:end", {
                tripId: trip._id
            })
            return
        }

      const  location = path[index] 

        await saveLocation(
            trip._id,
            location.lat,
            location.lng
        )

        io.emit("driver:move",{
            tripId:trip._id,
            lat:location?.lat,
            lng: location.lng
        })

        index++
    },1000)
}