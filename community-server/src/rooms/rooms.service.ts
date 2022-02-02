import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Room_User } from './entities/room_user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)private roomRepository:Repository<Room>,@InjectRepository(Room_User)private roomuserRepository:Repository<Room_User>){}
 async create(createRoomDto,userId:string) {
  // let newRoom =new Room();
  // newRoom.name=createRoomDto.name;
  // newRoom.description=createRoomDto.description;
  // newRoom.isPrivateRoom=createRoomDto.isPrivateRoom;
  // //@ts-ignore
  // newRoom.users.push(userId);
  let newRoom= await this.roomRepository.save(createRoomDto);
  let newroomuser=new Room_User();
  newroomuser.room=newRoom;
  newroomuser.userId=userId;
  //@ts-ignore
  // newroomuser.user=userId;
   await this.roomuserRepository.save(newroomuser);
   return newRoom;
  //@ts-ignore
  // newRoom.users.push(userId);
  // await this.roomRepository.save(newRoom);
  //  await getConnection().createQueryBuilder().insert().into(Room).values(createRoomDto).execute()
  
  }
  async addUsersToRoom(userId,roomId)
  {
    return this.roomuserRepository.save({userId,roomId})
  }
  async findRoomByUsers(id) {
    return await getConnection().createQueryBuilder(Room,'room').leftJoinAndSelect("room.roomUsers","roomusers").where("roomusers.userId=:id",{id}).getMany();

  }
  async findRoomId()
  {
    return await this.roomRepository.find();
                                         
  }
  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
