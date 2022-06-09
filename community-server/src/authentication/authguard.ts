import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger, ValidationPipe } from "@nestjs/common";
import { Request } from "express";
import { AuthenticationService } from "./authentication.service";
import {JwtService}from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate
{
    // constructor(private jwtService:JwtService,
    //     // private authenticationService:AuthenticationService
    //     ){}
    canActivate(context:ExecutionContext)
    {
        const request=context.switchToHttp().getRequest();
        return this.validate(request);
    }
    validate(request:Request):boolean
    {
        // console.log(request.cookies);
        try { 
            
        const payload= jwt.verify(request.cookies?.Authentication,'mysecret');
        if(payload)
        {
            request["user"]=payload;
            return true;
        }
        } catch (error) {
            Logger.debug(error)
            return false;
        }
        
    }
    
    
}
@Injectable()
export class RefreshGuard implements CanActivate
{
    canActivate(context:ExecutionContext)
    {
        const request=context.switchToHttp().getRequest();
        return this.validate(request);
    }
    validate(request:Request):boolean
    {
        try { 
            
        const payload= jwt.verify(request.cookies?.Refresh,'mysecret',{ignoreExpiration:false});
        // console.log(payload);

        if(payload)
        {
            request["user"]=payload;
            return true;
        }
        } catch (error) {
            Logger.debug(error)
            throw new HttpException('Refresh Token Incorrect',HttpStatus.BAD_REQUEST)
            return false;
        }
        
    }
}