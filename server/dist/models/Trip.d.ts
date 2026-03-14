import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    status: "pending" | "moving" | "completed";
    pickup?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    drop?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    status: "pending" | "moving" | "completed";
    pickup?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    drop?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: "pending" | "moving" | "completed";
    pickup?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    drop?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "pending" | "moving" | "completed";
    pickup?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    drop?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    status: "pending" | "moving" | "completed";
    pickup?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    drop?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    status: "pending" | "moving" | "completed";
    pickup?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    drop?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Trip.d.ts.map