import type { Request, Response } from "express";
import Trip from "../models/Trip.js";

export const getTrips = async (req: Request, res: Response) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).json({ message: "Server error" });
    }
};