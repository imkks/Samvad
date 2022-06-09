import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { ignoreElements } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { AuthGuard, RefreshGuard } from './authguard';
import { LoginCredential } from './dto/login.credentials.dto';
import { RequestWithUser } from './request.interface';

@Controller('authentication')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(private authenticationService:AuthenticationService){}

    @Post('signup')
    register(@Body() signUpCredentials:CreateUserDto)
    {
        return this.authenticationService.register(signUpCredentials)
    }
 
    @Post('login')
    async login(@Body()loginCredentials:LoginCredential,@Req()request:Request)
    {
       const {refreshcookie,accesTokenCookie}= await this.authenticationService.logIn(loginCredentials);
       request.res.setHeader('Set-Cookie',[refreshcookie,accesTokenCookie]);
       request.res.sendStatus(HttpStatus.OK);
       return; 
    //    return response.send("User Logged In");
    }
    @Get('refresh')
    @UseGuards(RefreshGuard)
    async refreshToken(@Req() request:RequestWithUser,)
    {
        // console.log(request.user)
        const accesTokenCookie= await this.authenticationService.isRefreshTokenMatched({email:request.user.email,name:request.user.name},request.cookies?.Refresh)
        //    const accesTokenCookie= await this.authenticationService.getAccessTokenCookie({email:request.user.email,name:request.user.name});
           request.res.setHeader('Set-Cookie',[accesTokenCookie]);
       request.res.status(HttpStatus.OK);
       return ;

    }   
   

}
