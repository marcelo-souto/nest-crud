import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// DTOs and interfaces
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

// Services
import { UserService } from './user.service';

// Guards
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/decorators/roles.enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Create a new user',
  })
  @Post()
  create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @ApiOperation({
    description: 'Get a user by id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get()
  getById(@Body() user: Pick<User, 'id'>) {
    return this.userService.getById(user.id);
  }

  // @UseGuards(AuthGuard)
  // @Get()
  // getAll() {
  //   return this.userService.getAll();
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.userService.delete(id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body(new ValidationPipe()) updateUserDTO: Partial<CreateUserDTO>,
  // ) {
  //   return this.userService.update(id, updateUserDTO);
  // }
}
