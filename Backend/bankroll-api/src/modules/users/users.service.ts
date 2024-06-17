import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { SESSION_REPOSITORY } from '../../core/constants';
import { Session } from '../sessions/session.entity';

@Injectable()
export class UsersService {

    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        @Inject(SESSION_REPOSITORY) private readonly sessionRepository: typeof Session,
    ) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByNAme(name: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { name } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

    async update(id : number): Promise<User> {
        let newBankroll: number = 0;
        let newHours: number = 0;
        let newWinrate: number = 0;

        let newSessions = await this.sessionRepository.findAll({
            where: {
                user_id: id
            }
        });

        newSessions.forEach(session => {
            newBankroll += session.cashOut - session.buyIn;
            newHours += session.timePlayed;
        });

        if(newHours > 0) {
            newWinrate = Math.ceil(newBankroll / newHours);
        } else {
            newWinrate = 0;
        }

        

        const user = await this.findOneById(id);

        await user.update({bankroll: newBankroll, hours: newHours, winrate: newWinrate});
        return user;
        
    }
}