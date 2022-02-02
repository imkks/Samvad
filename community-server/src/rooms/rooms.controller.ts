import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto,@Request() request) {
    console.log(request.query);
    return this.roomsService.create(createRoomDto,request.query.user);
  }
  @Post('/add')
  addUsersToRoom(@Body('userId')userId,@Body('roomId')roomId)
  {
      return this.roomsService.addUsersToRoom(userId,roomId);
  }
  @Get('/users/:id')
  find(@Param('id')id:string) {
    return this.roomsService.findRoomByUsers(id);
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
