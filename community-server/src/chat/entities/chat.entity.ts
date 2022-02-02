import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
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
    @ManyToOne(()=>User)
    sender:User

}
