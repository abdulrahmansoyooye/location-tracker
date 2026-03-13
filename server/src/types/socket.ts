export interface Coordinates {
    lat:number,
    lng:number
}


export interface StartTripPayload {
    pickup:Coordinates,
    drop:Coordinates
}

export interface TripType{
    id?: string
    pickup:Coordinates
    drop:Coordinates
    status:"started" | "moving" | "completed"
}


export interface ServerToClientEvents {
    "trip:started" : (trip: TripType) => void
    "trip:update"  : (location : Coordinates) =>void
}

export interface ClientToServerEvents {
    "trip:start" : (trip: StartTripPayload) => void
    
}