import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Dm } from './entities/dm.entity';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat)private chatRepository:Repository<Chat>,
  @InjectRepository(Dm)private dmRepository:Repository<Dm>){}
  async create(createChatDto) {
    // console.log(createChatDto)
    if(createChatDto.roomId)
      return await this.chatRepository.save(createChatDto);
    if(createChatDto.receiverId)
      return await this.dmRepository.save(createChatDto)
  }

  async findAll(roomIds,userId:string) {
    let grpmsgs=await this.chatRepository.find({where:[{senderId:userId},{roomId:In(roomIds)}]})
    let pvtmsgs=await this.dmRepository.find({where:[{senderId:userId},{receiverId:userId}]})
    return {grpmsgs,pvtmsgs}
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
