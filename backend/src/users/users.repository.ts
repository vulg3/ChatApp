import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  create(data: Partial<User>) {
    return this.model.create(data);
  }

  findAll() {
    return this.model.find().exec();
  }

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  findByUid(uid: string) {
    return this.model.findOne({ uid }).exec();
  }

  updateById(id: string, data: Partial<User>) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  updateByUid(uid: string, data: Partial<User>) {
    return this.model.findOneAndUpdate({ uid }, data, { new: true });
  }

  async addSocketId(uid: string, socketId: string) {
    return this.model.updateOne({ uid }, { $addToSet: { socketIds: socketId } });
  }

  async removeSocketId(uid: string, socketId: string) {
    return this.model.updateOne({ uid }, { $pull: { socketIds: socketId } });
  }

  async updateOnlineStatus(uid: string, isOnline: boolean) {
    return this.model.updateOne({ uid }, { isOnline, lastSeen: new Date() });
  }

  async addToArrayField(uid: string, field: string, value: string) {
    return this.model.updateOne({ uid }, { $addToSet: { [field]: value } });
  }
  
  async removeFromArrayField(uid: string, field: string, value: string) {
    return this.model.updateOne({ uid }, { $pull: { [field]: value } });
  }
  
}
