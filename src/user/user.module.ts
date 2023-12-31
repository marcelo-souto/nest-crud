import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { UserRepository } from './user.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
// import { RolesGuard } from 'src/guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HashModule } from 'src/providers/hash.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  controllers: [UserController],
  providers: [
    UserService,
    // { provide: 'UserRepository', useClass: UserRepository },
    { provide: APP_GUARD, useClass: AuthGuard },
    // { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
