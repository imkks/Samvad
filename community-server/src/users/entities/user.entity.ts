import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer'
import { Logger } from "@nestjs/common";
import { errorMonitor } from "events";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";
import { RoomUser } from "src/rooms/entities/roomuser.entity";
import { MutableBase } from "src/Entity/base.entity";
@Entity()
export class User extends MutableBase {
    // @PrimaryGeneratedColumn('uuid')
    // id:string;

    @Column()
    name:string;

    @PrimaryColumn()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @Column({nullable:true})
    @Exclude()
    refreshToken:string;

    
    // @OneToMany(()=>RoomUser,roomuser=>roomuser.room,{eager:true})
    // @JoinTable()
    // roomUsers:RoomUser[];


    async comparePassword(passwordInPlainText){
        // console.log(passwordInPlainText,this.password)
        try{
            return  await bcrypt.compare(passwordInPlainText,this.password)


        }
        catch(error)
        {
            Logger.debug(error)
        }
        

    }
    async compareRefreshToken(refreshTokenInPlainText){
        // console.log(passwordInPlainText,this.password)
        try{

            return  await bcrypt.compare(refreshTokenInPlainText,this.refreshToken)


        }
        catch(error)
        {
            Logger.debug(error)
            return false;
        }
        

    }
    


}
