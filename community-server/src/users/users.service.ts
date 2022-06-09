import { Injectable, Logger } from '@nestjs/common';
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
  //  Logger.debug(createUserDto)
    const newUser=this.usersRepository.create(createUserDto);
    // newUser.name=createUserDto.namec
    let user= await this.usersRepository.save(newUser);
    
    return user;
  }

  // async findUsersByRoom(id) {
  //   // return await this.usersRepository.find({relations:["userRooms"],where:{userRooms:{roomId:id}}});
  //   return await getConnection().createQueryBuilder(User,'user').leftJoinAndSelect("user.userRooms","userrooms").where("userrooms.roomId=:id",{id}).getMany();
  // }
  async setRefreshToken(refreshToken,user:User)
  { 
    
      user.refreshToken=refreshToken;
      return await this.usersRepository.save(user);
  }
  async findAll()
  {
    return await this.usersRepository.find();
  }
 async findOne(email: string) {
   try {
    const user=await this.usersRepository.find({email:email});
    return user[0];

     
   } catch (error) {
     Logger.error(error)
     
   }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
