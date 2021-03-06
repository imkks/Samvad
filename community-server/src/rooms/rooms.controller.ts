import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { addUserDto } from './dto/add-user-dto';
import { AuthGuard } from 'src/authentication/authguard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRoomDto: CreateRoomDto,@Request() request) {
    // console.log(request.query);
    return this.roomsService.create(createRoomDto,request.user.email);
  }
  @Post('/add')
  @UseGuards(AuthGuard)
  addUsersToRoom(@Body()adduserdto:addUserDto,@Request()request)
  {
      return this.roomsService.addUsersToRoom(adduserdto.userIds,adduserdto.roomId,request.user.email);
  }
  @Get()
  @UseGuards(AuthGuard)
  find(@Request() req) {
    return this.roomsService.findRoomByUsers(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
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
