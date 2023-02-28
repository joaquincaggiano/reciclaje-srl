import mongoose, { Schema, model, Model } from 'mongoose';
import { ISubscribe } from '@/interfaces';

const subscribeSchema = new Schema({
    email   : { type: String, required: true, unique: true },
}, {
    timestamps: true,
})

const Subscribe:Model<ISubscribe> = mongoose.models.Subscribe || model('Subscribe', subscribeSchema);

export default Subscribe;