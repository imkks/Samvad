import { ImmutableBase } from "src/Entity/base.entity";
import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PvtMessage extends ImmutableBase {
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    message:string;
    @Column()
    receiverId:string;
    @Column()
    senderId:string;
    

}
