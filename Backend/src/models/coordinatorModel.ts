import mongoose, { Document, Schema } from "mongoose";

export interface Coordinator extends Document {
  name: string;
  occupation: string;
  phone_number: string;
  email: string;
  image_url: string;
  about: string;
  isFeatured: boolean;
}

const coordinatorSchema: Schema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  phone_number: { type: String },
  email: { type: String, required: true },
  image_url: { type: String },
  about: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default mongoose.model<Coordinator>("Coordinator", coordinatorSchema); 