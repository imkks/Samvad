import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dm {
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    message:string;
    @Column()
    receiverId:string;
    @Column()
    senderId:string;
    @ManyToOne(()=>User)
    receiver:User
    @ManyToOne(()=>User)
    sender:User

}
