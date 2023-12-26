import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  create(user: Omit<User, 'id'>) {
    const userExists = this.getByEmail(user.email);

    if (userExists) throw new BadRequestException('User already exists');

    this.userRepository.create(user);

    return user;
  }

  getAll() {
    return this.userRepository.getAll();
  }

  getById(id: string) {
    const user = this.userRepository.getById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  update(id: string, newUserInformation: Partial<User>) {
    const user = this.getById(id);
    if (!user) throw new NotFoundException('User not found');

    const updatedUser = this.userRepository.update(id, newUserInformation);
    return updatedUser;
  }

  delete(id: string) {
    const user = this.getById(id);
    if (!user) throw new NotFoundException('User not found');

    this.userRepository.delete(id);
  }
}
