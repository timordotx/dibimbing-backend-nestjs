import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaProducer {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) { }

    async sendMessages(topic: string, message: any) {
        this.kafkaClient.emit(topic, JSON.stringify(message));
        console.log(`Sent messages to topic [${topic}]`, message);
    }
}