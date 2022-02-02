import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Room_User } from './entities/room_user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Room,Room_User])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports:[RoomsService]
})
export class RoomsModule {}
