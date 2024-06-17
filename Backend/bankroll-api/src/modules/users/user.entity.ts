import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';



@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    bankroll: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    hours: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    winrate: number;

}