import { Module } from '@nestjs/common';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { TestModule } from './test/test.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false, // Pakai migration
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    UserModule,
    TestModule,
    KafkaModule,
    AuthModule,
    TransactionModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'default_broker'],
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
    ])
  ],
})
export class AppModule { }
