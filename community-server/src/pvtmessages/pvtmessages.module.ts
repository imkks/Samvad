import { Module } from '@nestjs/common';
import { PvtmessagesService } from './pvtmessages.service';
import { PvtmessagesController } from './pvtmessages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PvtMessage } from './entity/pvtmessage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PvtMessage])],
  controllers: [PvtmessagesController],
  providers: [PvtmessagesService],
  exports:[PvtmessagesService]
})
export class PvtmessagesModule {}
