import { Controller, Post, Body, HttpCode, Param, Get, Delete, ValidationPipe, HttpStatus } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionDto } from './dto/session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionService: SessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) session: SessionDto) {
    await this.sessionService.create(session);
    return {
      message: "Session created successfully",
      statusCode: 201
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findPostsBy() {
    return await this.sessionService.findAll();
  }

  @Delete(':id')
  async deleteSessionByID(@Param('id') id: number) {
    await this.sessionService.deleteSes(id);
    return {
      message: "Session deleted successfully",
      statusCode: 200
    }
  }
}