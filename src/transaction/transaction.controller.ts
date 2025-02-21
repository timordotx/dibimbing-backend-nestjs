import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Transaction } from "./transaction.schema";
import { TransactionService } from "./transaction.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("transactions")
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    async create(@Body() transaction: Partial<Transaction>) {
        return this.transactionService.createTransaction(transaction);
    }

    @Get()
    async findAll() {
        return this.transactionService.getTransactions();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() transaction: Partial<Transaction>) {
        return this.transactionService.updateTransaction(id, transaction);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.transactionService.deleteTransaction(id);
    }
}