import { IsNumber, Min } from "class-validator";
import { Transform } from "class-transformer";

export class SessionDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly user_id: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    readonly buyIn: number;

    @IsNumber()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly cashOut: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    readonly timePlayed: number;
}