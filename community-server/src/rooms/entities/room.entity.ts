
import { MutableBase } from "src/Entity/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomUser } from "./roomuser.entity";

@Entity()
export class Room extends MutableBase {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    description:string;
    @OneToMany(()=>RoomUser,roomuser=>roomuser.room,{eager:true})
    @JoinTable()
    roomUsers:RoomUser[];
 
    
}
