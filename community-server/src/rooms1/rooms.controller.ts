import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from 'src/authentication/authguard';
import { RequestWithUser } from 'src/authentication/request.interface';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRoomDto: CreateRoomDto,@Request() request:RequestWithUser) {
    
    return this.roomsService.create(createRoomDto,request.user.email);
  }
  @Post('/add')
  @UseGuards(AuthGuard)
  addUsersToRoom(@Body('userId')userId,@Body('roomId')roomId)
  {
      return this.roomsService.addUsersToRoom(userId,roomId);
  }
  @Get()
  @UseGuards(AuthGuard)
  find(@Req()request:RequestWithUser) {
    return this.roomsService.findRoomByUsers(request.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
