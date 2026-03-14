import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    lat?: number | null;
    lng?: number | null;
    timestamp?: NativeDate | null;
    tripId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Location.d.ts.map