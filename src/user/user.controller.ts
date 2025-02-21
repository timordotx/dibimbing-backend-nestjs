import { Controller, Post, Body, UseGuards, Get, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { KafkaProducer } from '../kafka/kafka.producer';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private kafkaProducer: KafkaProducer) { }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.userService.createUser(body.username, body.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    return {
      message: 'Authorized User',
      username: req.user.username,
    };
  }

  @Get('send')
  async sendMessage() {
    await this.kafkaProducer.sendMessages('my-topic', { message: 'Hello Kafka' });
    return { message: 'Sent to Kafka' };
  }
}
