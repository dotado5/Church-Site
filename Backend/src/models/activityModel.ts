import mongoose, { Document, Schema } from 'mongoose';


export interface Activity extends Document {
    name: string;
    date: string;
    description: string;
}

const entityCSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model<Activity>('Activity', entityCSchema);
