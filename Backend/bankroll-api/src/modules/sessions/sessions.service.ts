import { Injectable, Inject } from '@nestjs/common';
import { SESSION_REPOSITORY } from 'src/core/constants';
import { SessionDto } from './dto/session.dto';
import { Session } from './session.entity';

@Injectable()
export class SessionsService {

    constructor(@Inject(SESSION_REPOSITORY) private readonly sessionRepository: typeof Session) { }

    async create(session: SessionDto): Promise<Session> {
        return await this.sessionRepository.create<Session>(session);
    }

    async findAll(): Promise<Session[]> {
        return await this.sessionRepository.findAll<Session>();
    }

    async deleteSes(Sesid: number) {
        return await this.sessionRepository.destroy({ where: { id: Sesid } });
    }

}
