import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat/chat.gateway';
import { RoomsModule } from './rooms/rooms.module';
import { ChatsModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule, ChatsModule, RoomsModule, MessagesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ChatService, ChatGateway],
})
export class AppModule { }
