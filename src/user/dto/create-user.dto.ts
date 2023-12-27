import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  /**
   * @example John
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example johndoe@email.com
   */
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * @example 123456
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * @example [1, 2]
   */
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  roles: number[];
}
