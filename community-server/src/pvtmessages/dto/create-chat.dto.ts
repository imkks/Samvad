import { IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    message:string;
    @IsString()
    senderId:string;
    @IsString()
    receiverId:string;
    
}
