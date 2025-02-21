import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionController } from "./transaction.controller";
import { TransactionSchema } from "./transaction.schema";
import { TransactionService } from "./transaction.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])],
    providers: [TransactionService],
    controllers: [TransactionController],
})

export class TransactionModule { }