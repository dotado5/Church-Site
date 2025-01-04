import mongoose, { Document, Schema } from 'mongoose';

export interface Article extends Document {
    displayImage: string;
    title: string;
    authorId: string;
    text: string;
    date: Date;
    readTime: Date;
}

const entityASchema: Schema = new Schema({
    displayImage: { type: String, required: true },
    title: { type: String, required: true },
    authorId: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    readTime: { type: Date, required: true },
});

export default mongoose.model<Article>('Articles', entityASchema);
