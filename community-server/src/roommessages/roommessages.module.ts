import { Module } from '@nestjs/common';
import { RoommessagesService } from './roommessages.service';
import { RoommessagesController } from './roommessages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMessage } from './entity/roommessage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoomMessage])],
  controllers: [RoommessagesController],
  providers: [RoommessagesService],
  exports: [RoommessagesService]

})
export class RoommessagesModule {}
