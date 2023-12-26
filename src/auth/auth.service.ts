import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  signIn(email: string, password: string): any {
    const user = this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user && user.password !== password) {
      throw new UnauthorizedException();
    }

    const result = {
      token: this.jwtService.sign(
        { id: user.id },
        {
          secret: this.configService.get('jwt.secret'),
          expiresIn: this.configService.get('jwt.expiresIn'),
        },
      ),
    };

    return result;
  }
}
