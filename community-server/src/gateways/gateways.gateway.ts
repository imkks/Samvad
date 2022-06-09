import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server,Socket} from 'socket.io'
import { PvtmessagesService } from 'src/pvtmessages/pvtmessages.service';
import { RoommessagesService } from 'src/roommessages/roommessages.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { MessageDto } from './dto/message.gateway.dto';
import { GatewaysService } from './gateways.service';

@WebSocketGateway()
export class GatewaysGateway implements OnGatewayConnection {
  @WebSocketServer()server:Server
  constructor(private readonly roomService:RoomsService,
    private readonly roomMessageSer:RoommessagesService,
    private readonly pvtmsgService:PvtmessagesService) {}
  async handleConnection(socket:Socket)
  {
    socket["userId"]=socket.handshake.query.userId;
    socket.join(socket["userId"]);
    //get roomid and join them for the user
    const rooms= await this.roomService.findRoomByUsers(socket["userId"]);
    let roomIds=[];
    rooms.forEach((room)=>{socket.join(room.id);roomIds.push(room.id)})
    // console.log(socket["userId"]);
    // const messages=await this.chatService.findAll(roomIds,socket["userId"])
    // socket.emit('receive_all_messages',messages)


  }
   
  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() messageBody:MessageDto,@ConnectedSocket() socket:Socket)
  {

    // console.log(messageBody)
    // this.chatService.create({senderId:socket["userId"],roomId:messageBody.roomId,message:messageBody.content,receiverId:messageBody.receiverId})
    if(messageBody.roomId)
    {
      this.roomMessageSer.create({...messageBody,senderId:socket["userId"],roomId:messageBody.roomId})
      socket.to(messageBody.roomId).emit('receive_message',{...messageBody,senderId:socket["userId"]})
      
    } 
    else if (messageBody.receiverId)
    {
      this.pvtmsgService.create({...messageBody,senderId:socket["userId"],receiverId:messageBody.receiverId});
      socket.to(messageBody.receiverId).emit('receive_message',{...messageBody,senderId:socket["userId"]})
    }
    // else
    // socket.to(messageBody.receiverId).emit('receive_message',{msg:messageBody.content,senderId:socket["userId"],receiverId:messageBody.receiverId})

    // socket.emit('receive_message',createChatDto)
    // this.server.emit('receive_message','from server')
  }


  
}
