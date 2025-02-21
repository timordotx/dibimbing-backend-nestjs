import { Module } from "@nestjs/common";
import { KafkaModule } from "../kafka/kafka.module";
import { TestController } from "./test.controller";

@Module({
    imports: [KafkaModule],
    controllers: [TestController],
})

export class TestModule { }