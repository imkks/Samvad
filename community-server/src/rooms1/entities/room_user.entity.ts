import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Room_User
{     
        @PrimaryGeneratedColumn('uuid')
        id:string;
        @Column()
        roomId:string;
        @Column()
        userId:string;


        @ManyToOne(()=>Room,room=>room.roomUsers)
        room:Room
        
        // @ManyToOne(()=>User,user=>user.userRooms)
        // user:User
}