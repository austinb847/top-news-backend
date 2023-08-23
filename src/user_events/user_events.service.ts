import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEvent } from './user_events.model';

@Injectable()
export class UserEventsService {
  constructor(
    @InjectModel('UserEvent') private readonly userEventModel: Model<UserEvent>,
  ) {}

  async getUserEventsByUserId(userId: string): Promise<UserEvent | null> {
    return this.userEventModel.findOne({ userId });
  }

  async createUserEvent(userId: string, url: string): Promise<UserEvent> {
    const userEvents = await this.userEventModel.findOne({ userId });

    if (!userEvents) {
      return this.userEventModel.create({
        userId,
        visitedUrls: [{ url, timestamp: new Date() }],
      });
    }

    userEvents.visitedUrls.push({ url, timestamp: new Date() });
    return userEvents.save();
  }
}
