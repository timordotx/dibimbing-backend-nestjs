import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./transaction.schema";

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
    ) { }

    async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(transaction);
        return createdTransaction.save();
    }

    async getTransactions(): Promise<Transaction[]> {
        return this.transactionModel.find().exec();
    }

    async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction | null> {
        return this.transactionModel.findByIdAndUpdate(id, transaction, { new: true }).exec();
    }

    async deleteTransaction(id: string): Promise<Transaction | null> {
        return this.transactionModel.findByIdAndDelete(id).exec();
    }
}