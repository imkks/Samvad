
import { ImmutableBase } from "src/Entity/base.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class RoomUser extends ImmutableBase
{     
        @PrimaryGeneratedColumn('uuid')
        id:string;
        @Column()
        roomId:string;
        @Column()
        userId:string;
        @Column()
        isAdmin:boolean;
       
        @ManyToOne(()=>Room,room=>room.roomUsers)
        room:Room
        
        
}