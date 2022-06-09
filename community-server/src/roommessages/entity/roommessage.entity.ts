import { ImmutableBase } from "src/Entity/base.entity";
import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoomMessage extends ImmutableBase {
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    message:string;
    @Column()
    roomId:string;
    @Column()
    senderId:string;
    @ManyToOne(()=>Room)
    room:Room
    

}
