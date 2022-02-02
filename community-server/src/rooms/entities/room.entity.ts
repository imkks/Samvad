import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room_User } from "./room_user.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    description:string;
    @OneToMany(()=>Room_User,roomuser=>roomuser.room,{eager:true})
    @JoinTable()
    roomUsers:Room_User[];

    
}
