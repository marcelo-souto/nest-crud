import { IsString } from 'class-validator';

export class GetUserByIdDTO {
  @IsString()
  id: string;
}
