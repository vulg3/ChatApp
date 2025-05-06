import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop()
  avatar?: string;

  @Prop()
  phone?: string;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({ type: [String], default: [] })
  socketIds: string[];

  @Prop()
  lastOnline?: Date;

  @Prop({ type: [String], default: [] })
  friends: string[];

  @Prop({ type: [String], default: [] })
  blockedUsers: string[];

  @Prop({ default: 'vi' })
  language: string;

  @Prop({ default: 'google' })
  provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
