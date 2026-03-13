export interface Coordinates {
    lat:number,
    lng:number
}


export interface StartTripPayload {
    pickup:Coordinates,
    drop:Coordinates
}

export interface TripType{
    _id?: string
    id?: string
    pickup:Coordinates
    drop:Coordinates
    status:"pending" | "started" | "moving" | "completed"
}


export interface ServerToClientEvents {
    "trip:started" : (trip: TripType) => void
    "trip:update"  : (location : Coordinates) =>void
    "trip:end": (data: { tripId: string | undefined }) => void
    "driver:move": (data: { tripId: string | undefined, lat: number, lng: number }) => void
}

export interface ClientToServerEvents {
    "trip:start" : (trip: StartTripPayload) => void
    
}