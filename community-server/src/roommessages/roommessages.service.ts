import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-chat.dto';
import { RoomMessage } from './entity/roommessage.entity';

@Injectable()
export class RoommessagesService {
    constructor(@InjectRepository(RoomMessage)private roomMessageRepo:Repository<RoomMessage>){}
    async create(createChatDto:CreateMessageDto) {
        // console.log(createChatDto)
    
          return await this.roomMessageRepo.save(createChatDto);
           }
    
      async findAll(roomIds,userId:string) {
        return await this.roomMessageRepo.find({where:[{senderId:userId},{roomId:In(roomIds)}]})
        
        
      }
    
    
    
}
