import { Schema, Document } from "mongoose";

export const TransactionSchema = new Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
},
    { strict: false } // Allow additional fields
);

export interface Transaction extends Document {
    amount: number;
    description: string;
    date: Date;
    [key: string]: any; // Menangani field tambahan
}