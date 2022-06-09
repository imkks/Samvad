import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import {JwtService} from '@nestjs/jwt'
import { LoginCredential } from './dto/login.credentials.dto';
import { Request } from 'express';

@Injectable()
export class AuthenticationService {
    constructor(private userService:UsersService){}

    async register(createUserDto:CreateUserDto)
    {
            try {
                const hashedPassword= await bcrypt.hash(createUserDto.password,10);
                // console.log(hashedPassword)
                // const user={...createUserDto,password:hashedPassword}
                const user=await this.userService.create({...createUserDto,password:hashedPassword})
                user.password=undefined;  
                // Logger.debug(hashedPassword)
                return user;
            } 
            catch (error) 
            {
                if(error?.code=='23505')
                    throw new HttpException(error,HttpStatus.BAD_REQUEST)
                else
                    throw new HttpException(error,HttpStatus.BAD_REQUEST)
                
            }
    }

    async logIn(loginCredentials:LoginCredential)
    {
            try
            {
                console.log(loginCredentials)

                const foundUser=await this.userService.findOne(loginCredentials.email);
                if(!foundUser)
                    throw new HttpException('User does not exist',HttpStatus.NOT_FOUND);
                const isPasswordMatching= await foundUser.comparePassword(loginCredentials.password);
                Logger.debug(foundUser)
                if(!isPasswordMatching)
                    throw new HttpException('Wrong Credentials',HttpStatus.BAD_REQUEST)
                const accesTokenCookie= this.getAccessTokenCookie({email:foundUser.email,name:foundUser.name});
                const {refreshToken,refreshcookie}= this.getRefreshTokenCookie({email:foundUser.email,name:foundUser.name})
                const hashedRT= await bcrypt.hash(refreshToken,10);
                console.log(hashedRT)
                const updateUser=await this.userService.setRefreshToken(hashedRT,foundUser);
                console.log(updateUser)
                return {accesTokenCookie,refreshcookie}


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
    }
    async isRefreshTokenMatched(payload,refreshToken)
    {
        const foundUser=await this.userService.findOne(payload.email);
        if(foundUser)
        {
        const isMatched= await foundUser.compareRefreshToken(refreshToken)

        }
        else{
            throw new HttpException('Wrong Credentials',HttpStatus.BAD_REQUEST);
        }
        
        return await this.getAccessTokenCookie(payload);
        

    }
    getAccessTokenCookie(payload:object)
    {
        const token= jwt.sign(payload,'mysecret',{expiresIn:'10s'});
        return `Authentication=${token};HttpOnly;Path=/ `
    }
    getRefreshTokenCookie(payload:object)
    {
        const refreshToken=jwt.sign(payload,'mysecret',{expiresIn:'1d'});
        const refreshcookie= `Refresh=${refreshToken};HttpOnly;`
        return {refreshToken,refreshcookie}
    }
    
}
