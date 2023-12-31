import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/sign-in-dto';
import { HashService } from 'src/providers/hash.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<{ token: string }> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatching = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.expiresIn'),
      },
    );

    return { token };
  }
}
