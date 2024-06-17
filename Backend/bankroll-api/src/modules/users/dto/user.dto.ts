import { IsAlphanumeric, IsNumber, IsString, Matches, Min, IsOptional } from "class-validator";

export class UserDto {
    @IsString()
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Name must contain only letters',
    })
    @IsOptional()
    readonly name: string;

    @IsNumber()
    @Min(0, { message: 'Bankroll must be non-negative number'})
    @IsOptional()
    readonly bankroll: number;

    @IsNumber()
    @Min(0, { message: 'Hours must be non-negative number'})
    @IsOptional()
    readonly hours: number;

    @IsNumber()
    @Min(0, { message: 'Winrate must be non-negative number'})
    @IsOptional()
    readonly winrate: number;
}