import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {JwtModule} from '@nestjs/jwt'
import { AuthGuard } from './authguard';

@Module({
  imports:[UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}
