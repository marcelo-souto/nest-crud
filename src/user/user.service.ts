import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

export class UserService {
  constructor(private users: User[] = []) {}

  create(user: Omit<User, 'id'>) {
    const userExists = this.getByEmail(user.email);

    if (userExists) throw new BadRequestException('User already exists');

    this.users.push({
      ...user,
      id: Date.now().toString(),
    });
  }

  getAll() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  update(id: string, newUserInformation: Partial<User>) {
    const user = this.getById(id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, newUserInformation);

    return user;
  }

  delete(id: string) {
    const user = this.getById(id);
    if (!user) throw new NotFoundException('User not found');

    this.users = this.users.filter((user) => user.id !== id);
  }
}
