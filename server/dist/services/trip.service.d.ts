import type { Coordinates, TripType, ServerToClientEvents } from "../types/socket.js";
import { Server } from "socket.io";
export declare const startTrip: (pickup: Coordinates, drop: Coordinates) => Promise<TripType>;
export declare const stimulateTripMovement: (trip: TripType, io: Server<any, ServerToClientEvents>) => Promise<void>;
//# sourceMappingURL=trip.service.d.ts.map