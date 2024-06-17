import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { sessionsProvider } from './sessions.provider';
import { SessionsController } from './sessions.controller';

@Module({
    providers: [SessionsService, ...sessionsProvider],
    controllers: [SessionsController],
    exports: [SessionsService, ...sessionsProvider],
})
export class SessionsModule {}