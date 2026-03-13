import type { Coordinates } from "../types/socket.js"

export const generateSteps = (pickup: Coordinates, drop: Coordinates, steps = 50) => {
    const latStep = (drop.lat - pickup.lat) / steps
    const lngStep = (drop.lng - pickup.lng) / steps


    const path = []


    for (let i = 0; i <= steps; i++) {
      path.push({
        lat: pickup.lat + latStep * i, 
        lng: pickup.lng + lngStep * i 
      })
        
    }
    return path
}