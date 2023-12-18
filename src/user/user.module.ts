import { Module } from '@nestjs/common';
import { CreateUserModule } from './services/create-user/create-user.module';

@Module({
  imports: [CreateUserModule],
})
export class UserModule {}
