import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async create(user: Omit<User, 'id'>) {
    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    await this.userRepository.save(user);
  }
}
