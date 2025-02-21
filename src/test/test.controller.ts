import { Controller, Get } from "@nestjs/common";
import { KafkaProducer } from "../kafka/kafka.producer";

@Controller('test')
export class TestController {
    constructor(private readonly kafkaProducer: KafkaProducer) { }

    @Get('send')
    async sendMessage() {
        await this.kafkaProducer.sendMessages('my-topic', { message: 'Hello from NestJS' });
        return { message: 'Sent to Kafka' };
    }
}