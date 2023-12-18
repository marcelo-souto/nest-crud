import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {
    this.userService.create(createUserDTO);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDTO: Partial<CreateUserDTO>,
  ) {
    return this.userService.update(id, updateUserDTO);
  }
}
