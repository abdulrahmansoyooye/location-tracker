import Trip from "../models/Trip.js";
export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    }
    catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=trip.controller.js.map