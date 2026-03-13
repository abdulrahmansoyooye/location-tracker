import type { Request, Response } from "express";
import Trip from "../models/Trip.js";

export const getTrips = async (req:Request,res:Response)=>{
    const trips  = await Trip.find()

    res.json(trips)
}