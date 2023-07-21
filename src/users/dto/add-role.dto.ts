import { IsString, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Name must be a string' })
  readonly name: string;
  @IsNumber({}, { message: 'User id must be a number' })
  readonly userId: number;
}
