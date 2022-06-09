import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { GatewaysGateway } from './gateways.gateway';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoommessagesModule } from 'src/roommessages/roommessages.module';
import { PvtmessagesModule } from 'src/pvtmessages/pvtmessages.module';

@Module({
  imports:[RoomsModule,RoommessagesModule,PvtmessagesModule],
  providers: [GatewaysGateway, GatewaysService]
})
export class GatewaysModule {}
