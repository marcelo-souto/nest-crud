import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from './create-user.service';
import { DatabaseModule } from 'src/providers/database/database.module';
import { userProviders } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [...userProviders, CreateUserService],
  exports: [CreateUserService],
})
export class CreateUserModule {}
