import mongoose from "mongoose";
const TripSchema = new mongoose.Schema({
    pickup: {
        lat: Number,
        lng: Number
    },
    drop: {
        lat: Number,
        lng: Number
    },
    status: {
        type: String,
        enum: ["pending", "moving", "completed"],
        default: "pending"
    }
}, {
    timestamps: true
});
export default mongoose.model("Trip", TripSchema);
//# sourceMappingURL=Trip.js.map