import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-chat.dto';
import { PvtMessage } from './entity/pvtmessage.entity';

@Injectable()
export class PvtmessagesService {
    constructor(@InjectRepository(PvtMessage)private pvtMessageRepository:Repository<PvtMessage>){}
    async create(message:CreateMessageDto)
    {
            await this.pvtMessageRepository.save(message);
    }
    async find(userId)
    {
        return await this.pvtMessageRepository.find({where:[{senderId:userId},{receiverId:userId}]});
    }
}
