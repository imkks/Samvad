import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import {Server,Socket} from 'socket.io'
import { randomUUID } from 'crypto';
import { RoomsService } from 'src/rooms/rooms.service';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()server:Server
  constructor(private readonly chatService: ChatService,private readonly roomsService:RoomsService) {
    
  }
  
  async handleConnection(socket:Socket)
  {
    socket["userId"]=socket.handshake.query.userId;
    socket.join(socket["userId"]);
    //get roomid and join them for the user
    const rooms= await this.roomsService.findRoomByUsers(socket["userId"]);
    let roomIds=[];
    rooms.forEach((room)=>{socket.join(room.id);roomIds.push(room.id)})
    // console.log(socket["userId"]);
    const messages=await this.chatService.findAll(roomIds,socket["userId"])
    socket.emit('receive_all_messages',messages)


  }
   
  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() messageBody,@ConnectedSocket() socket:Socket)
  {

    this.chatService.create({senderId:socket["userId"],roomId:messageBody.roomId,message:messageBody.content,receiverId:messageBody.receiverId})
    if(messageBody.roomId) 
    socket.to(messageBody.roomId).emit('receive_message',{msg:messageBody.content,senderId:socket["userId"],roomId:messageBody.roomId})
    else
    socket.to(messageBody.receiverId).emit('receive_message',{msg:messageBody.content,senderId:socket["userId"],receiverId:messageBody.receiverId})

    // socket.emit('receive_message',createChatDto)
    // this.server.emit('receive_message','from server')
  }


  // @SubscribeMessage('createChat')
  // create(@MessageBody() createChatDto: CreateChatDto,@ConnectedSocket()socket:Socket) {
  //   console.log(createChatDto)
  //   this.server.sockets.emit('receive_message','hello ev')
  // }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
