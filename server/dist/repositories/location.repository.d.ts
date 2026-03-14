export declare const saveLocation: (tripId: string, lat: number, lng: number) => Promise<import("mongoose").Document<unknown, {}, {
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=location.repository.d.ts.map