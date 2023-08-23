import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEventDocument = UserEvent & Document;

@Schema()
export class UserEvent {
  @Prop()
  userId: string;

  @Prop([
    {
      url: { type: String },
      timestamp: { type: Date },
    },
  ])
  visitedUrls: { url: string; timestamp: Date }[];
}

export const UserEventSchema = SchemaFactory.createForClass(UserEvent);
