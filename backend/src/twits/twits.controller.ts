import {
  Body,
  Controller,
  Delete,
  Get, Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TwitsService } from './twits.service';
import { CreateTwitDto } from './dto/create-twit.dto';
import { Twit } from './schemas/twit.schema';

@Controller('twits')
@UseGuards(AuthGuard('jwt'))
export class TwitsController {
  constructor(private readonly twitsService: TwitsService) {}
  @Get()
  findAll(): [Twit] | Promise<Twit[]> {
    return this.twitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Twit | null> {
    return this.twitsService.findOne(id);
  }
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Twit[]> {
    return this.twitsService.findByUser(userId);
  }
  @Post('create')
  async create(
    @Body() createTwitDto: CreateTwitDto,
  ): Promise<Twit | { message: string; statusCode: number }> {
    return await this.twitsService.create(
      createTwitDto.content,
      createTwitDto.authorId,
    );
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('content') content: string,
  ): Promise<
    | Twit
    | {
        message: string;
        statusCode: number;
      }
  > {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
    return this.twitsService.update(content, id);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Twit | { message: string }> {
    return this.twitsService.delete(id);
  }

  @Post('like')
  likeTwit(
    @Body('twitId') twitId: string,
    @Body('userId') userId: string,
  ): Promise<Twit | { message: string; statusCode: number }> {
    return this.twitsService.likeTwit(twitId, userId);
  }
}
