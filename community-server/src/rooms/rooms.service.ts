import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomUser } from './entities/roomuser.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)private roomRepository:Repository<Room>,@InjectRepository(RoomUser)private roomuserRepository:Repository<RoomUser>){}
 async create(createRoomDto,userId:string) {
  // let newRoom =new Room();
  // newRoom.name=createRoomDto.name;
  // newRoom.description=createRoomDto.description;
  // newRoom.isPrivateRoom=createRoomDto.isPrivateRoom;
  // //@ts-ignore
  // newRoom.users.push(userId);
  let newRoom= await this.roomRepository.save(createRoomDto);
  let newroomuser=new RoomUser();
  newroomuser.room=newRoom;
  newroomuser.userId=userId;
  newroomuser.isAdmin=true;
  //@ts-ignore
  // newroomuser.user=userId;
   await this.roomuserRepository.save(newroomuser);
   return newRoom;
  //@ts-ignore
  // newRoom.users.push(userId);
  // await this.roomRepository.save(newRoom);
  //  await getConnection().createQueryBuilder().insert().into(Room).values(createRoomDto).execute()
  
  }
  async addUsersToRoom(userIds:string[],roomId,user)
  {
    let foundroomuser=await this.roomuserRepository.findOne({where:{userId:user}});
    if(foundroomuser.isAdmin)
    {
      let bulkInsert:RoomUser[]=[];

      for(let user of userIds){
        // console.log(userId)
        let roomUser=new RoomUser()
        roomUser.roomId=roomId;
        
        roomUser.userId=user;
        roomUser.isAdmin=false;
        bulkInsert.push(roomUser);


  
      }
      await this.roomuserRepository.insert(bulkInsert)

   
    }
    else
    {
      throw new ForbiddenException('you are not admin');
    }
    
    // return this.roomuserRepository.save({userId,roomId})
  }
  async findRoomByUsers(id) {
    return await this.roomRepository.createQueryBuilder("room")
    .addSelect("roomusers.userId")
    .addSelect("roomusers.isAdmin")
    .leftJoin("room.roomUsers","roomusers")
    .where("roomusers.userId=:id",{id})
    .getMany();

  }
  async findRoomId()
  {
    return await this.roomRepository.find();
                                         
  }
  async findOne(id: string) {
    return await this.roomRepository.find({id});

    // return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
