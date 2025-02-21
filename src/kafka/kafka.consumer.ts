import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka.consumer.service";

@Injectable()
export class KafkaConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) { }

    async onModuleInit() {
        await this.consumerService.consumeMessages(
            { topic: 'my-topic', fromBeginning: true },
            async (message) => {
                console.log(`Received message: ${message.value.toString()}`);
            }
        );
    }
}