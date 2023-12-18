import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('user')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {
    return await this.createUserService.create(createUserDTO);
  }
}
