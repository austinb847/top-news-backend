import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEventsService } from './user_events.service';
import { UserEvent } from './user_events.model';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@Controller('users')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  //get events by user id
  @UseGuards(AuthorizationGuard)
  @Get(':userId/events')
  async getUser(@Param('userId') userId: string): Promise<UserEvent> {
    const userEvents = await this.userEventsService.getUserEventsByUserId(
      userId,
    );

    if (!userEvents) {
      throw new NotFoundException(
        `User events for user with ID ${userId} not found`,
      );
    }
    return userEvents;
  }

  //create event
  @UseGuards(AuthorizationGuard)
  @Post(':userId/events')
  async createUserEvent(
    @Param('userId') userId: string,
    @Body('url') url: string,
  ): Promise<UserEvent> {
    return this.userEventsService.createUserEvent(userId, url);
  }
}
