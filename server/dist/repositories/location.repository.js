import Location from "../models/Location.js";
export const saveLocation = async (tripId, lat, lng) => {
    return Location.create({
        tripId,
        lat,
        lng,
        timestamp: new Date()
    });
};
//# sourceMappingURL=location.repository.js.map