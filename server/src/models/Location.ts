import mongoose from "mongoose"

const LocationSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    lat: Number,
    lng: Number,
    timestamp: Date
}, {
    timestamps: true
})

export default mongoose.model("Location", LocationSchema)