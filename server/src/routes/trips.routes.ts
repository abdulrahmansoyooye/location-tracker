import { Router } from "express";
import { getTrips } from "../controllers/trip.controller.js";




const router = Router()

router.get("/",getTrips)

export default router