import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormconfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PvtmessagesModule } from './pvtmessages/pvtmessages.module';
import { RoommessagesModule } from './roommessages/roommessages.module';
import { GatewaysModule } from './gateways/gateways.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeormconfig), UsersModule, GatewaysModule,PvtmessagesModule,RoommessagesModule, RoomsModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
