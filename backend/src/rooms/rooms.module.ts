import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule { }
