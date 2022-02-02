import { Room } from "src/rooms/entities/room.entity";
import { Room_User } from "src/rooms/entities/room_user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    

    @OneToMany(()=>Room_User,userRoom=>userRoom.user)
    @JoinTable()
    userRooms:Room_User[];
    


}
