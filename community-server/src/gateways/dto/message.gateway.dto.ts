import { IsString } from "class-validator";

export class MessageDto {
    @IsString()
    message:string;
    @IsString()
    senderId:string;
    @IsString()
    roomId?:string;
    @IsString()
    receiverId?:string;
    
}
