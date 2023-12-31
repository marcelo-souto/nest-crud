import { BadRequestException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(user: CreateUserDTO) {
    const userExists = await this.userRepository.findBy({ email: user.email });

    console.log(userExists);

    if (userExists) throw new BadRequestException('User already exists');

    const newUser = new User(user);
    await this.entityManager.save(newUser);

    return { user: newUser };
  }
}
