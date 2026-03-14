import type { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "../types/socket.js";
type IOServer = Server<ClientToServerEvents, ServerToClientEvents>;
export declare const initializeTripSocket: (io: IOServer) => void;
export {};
//# sourceMappingURL=trip.socket.d.ts.map