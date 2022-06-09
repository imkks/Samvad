import { IsBoolean, IsString } from "class-validator";

export class addUserDto {
    
    userIds:string[];
    @IsString()
    roomId:string;
}
