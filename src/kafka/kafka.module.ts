import { Module } from "@nestjs/common";
import * as fs from 'fs';
import { KafkaProducer } from "./kafka.producer";
import { KafkaConsumer } from "./kafka.consumer";
import { ConsumerService } from "./kafka.consumer.service";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: [process.env.KAFKA_BROKER ?? 'default_broker'],
                        ssl: {
                            ca: [fs.readFileSync('./src/kafka/certs/ca.pem', 'utf-8')],
                            key: fs.readFileSync('./src/kafka/certs/service.key', 'utf-8'),
                            cert: fs.readFileSync('./src/kafka/certs/service.cert', 'utf-8')
                        }
                    },
                    consumer: {
                        groupId: 'nestjs-consumer-group',
                    },
                },
            },
        ]),
    ],
    providers: [KafkaProducer, KafkaConsumer, ConsumerService],
    exports: [KafkaProducer],
})

export class KafkaModule { }