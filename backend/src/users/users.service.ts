import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  create(dto: CreateUserDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByUid(uid: string) {
    const user = await this.repo.findByUid(uid);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: string, dto: UpdateUserDto) {
    return this.repo.updateById(id, dto);
  }

  updateOnlineStatus(uid: string, isOnline: boolean) {
    return this.repo.updateOnlineStatus(uid, isOnline);
  }

  addSocketId(uid: string, socketId: string) {
    return this.repo.addSocketId(uid, socketId);
  }

  removeSocketId(uid: string, socketId: string) {
    return this.repo.removeSocketId(uid, socketId);
  }

  async addFriend(uid: string, friendUid: string) {
    return this.repo.addToArrayField(uid, 'friends', friendUid);
  }
  
  async removeFriend(uid: string, friendUid: string) {
    return this.repo.removeFromArrayField(uid, 'friends', friendUid);
  }
  
  async blockUser(uid: string, blockedUid: string) {
    return this.repo.addToArrayField(uid, 'blockedUsers', blockedUid);
  }
  
  async unblockUser(uid: string, blockedUid: string) {
    return this.repo.removeFromArrayField(uid, 'blockedUsers', blockedUid);
  }
  
}
