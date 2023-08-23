import { Module } from '@nestjs/common';
import { UserEventsService } from './user_events.service';
import { UserEventsController } from './user_events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEventSchema } from './user_events.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'UserEvent', schema: UserEventSchema }]),
  ],
  providers: [UserEventsService],
  controllers: [UserEventsController],
})
export class UserEventsModule {}
