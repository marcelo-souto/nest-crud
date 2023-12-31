import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// DTOs and interfaces
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

// Services
import { UserService } from './user.service';

// Guards
import { Authenticated } from 'src/decorators/authenticated.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Create a new user',
  })
  @Post()
  async create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @ApiOperation({
    description: 'Get a user by id',
  })
  @ApiBearerAuth()
  @Authenticated()
  @Get()
  getById(@Body() user: Pick<User, 'id'>) {
    return 'this.userService.getById(user.id);';
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
