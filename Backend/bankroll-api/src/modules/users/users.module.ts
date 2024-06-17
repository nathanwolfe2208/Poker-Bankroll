import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
    imports: [SessionsModule],
    providers: [UsersService, ...usersProviders],
    controllers: [UsersController],
    exports: [UsersService, ...usersProviders],
})
export class UsersModule {}