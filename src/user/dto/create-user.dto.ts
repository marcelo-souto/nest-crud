import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'johndoe@email.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: [1, 2],
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  roles: number[];
}
