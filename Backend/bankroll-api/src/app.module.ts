import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { SessionsService } from './modules/sessions/sessions.service';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService, UsersService, SessionsService],
})
export class AppModule {}
