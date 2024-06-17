import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.entity';


@Table
export class Session extends Model<Session> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    buyIn: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cashOut: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    timePlayed: number;

    timestamps: false;
}