import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

import { AuthGuard } from 'src/guards/auth.guard';
import { GetUserByIdDTO } from './dto/get-user-by-id.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get()
  getById(@Body(new ValidationPipe()) user: GetUserByIdDTO) {
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
