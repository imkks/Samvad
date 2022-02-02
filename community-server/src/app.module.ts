import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormconfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeormconfig), UsersModule, ChatModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
