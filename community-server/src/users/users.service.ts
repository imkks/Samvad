import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository:Repository<User>,private readonly roomsService:RoomsService
  ){}
 async create(createUserDto: CreateUserDto) {
    // const newUser=new User();
    // newUser.name=createUserDto.name
    let user= await this.usersRepository.save(createUserDto);
    // await this.roomsService.create({name:user.name,description:'pvt chat',isPrivateRoom:true,id:user.id},user.id)
    return user;
    // return await getConnection().createQueryBuilder().insert().into(User,["name"]).values({name:createUserDto.name}).execute();
  }

  async findUsersByRoom(id) {
    // return await this.usersRepository.find({relations:["userRooms"],where:{userRooms:{roomId:id}}});
    return await getConnection().createQueryBuilder(User,'user').leftJoinAndSelect("user.userRooms","userrooms").where("userrooms.roomId=:id",{id}).getMany();
  }
  async findAll()
  {
    return await this.usersRepository.find();
  }
 async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
