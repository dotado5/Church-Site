import mongoose, { Document, Schema } from 'mongoose';

export interface Author extends Document {
    firstName: string;
    lastName: string;
    profileImage: string;
}

const entityBSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImage: { type: String, required: true },
});

export default mongoose.model<Author>('Author', entityBSchema);
