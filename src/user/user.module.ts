import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { KafkaProducer } from '../kafka/kafka.producer';
import { KafkaModule } from '../kafka/kafka.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as fs from 'fs';
@Module({
  imports: [TypeOrmModule.forFeature([User]), KafkaModule, ClientsModule.register([
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
  ])],
  providers: [UserService, KafkaProducer],
  controllers: [UserController],
  exports: [UserService, KafkaProducer],
})
export class UserModule { }
