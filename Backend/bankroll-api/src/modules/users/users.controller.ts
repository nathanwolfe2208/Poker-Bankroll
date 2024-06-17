
import { Controller, Post, Body, HttpCode, Put, Param, Get, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { STATUS_CODES } from 'http';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body(ValidationPipe) user: UserDto) {
    await this.usersService.create(user);
    return {
      message: 'User created successfully',
      statusCode: 201
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDto) {
    await this.usersService.update(id);
    return {
      message: 'User successfully updated',
      statusCode: 200
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.findOneById(id);
  }
}