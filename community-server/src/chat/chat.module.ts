import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from 'src/rooms/rooms.service';
import { RoomsModule } from 'src/rooms/rooms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Dm } from './entities/dm.entity';

@Module({
  imports:[RoomsModule,TypeOrmModule.forFeature([Chat,Dm])],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {
  
}
