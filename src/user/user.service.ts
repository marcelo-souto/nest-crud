import { BadRequestException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/providers/hash.service';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly hashService: HashService,
  ) {}

  async create(user: CreateUserDTO) {
    const userExists = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (userExists) throw new BadRequestException('User already exists');

    user.password = await this.hashService.hash(user.password);

    const newUser = new User(user);
    await this.entityManager.save(newUser);

    return { user: newUser };
  }
}
