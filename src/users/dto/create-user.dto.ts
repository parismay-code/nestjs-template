import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.ru', description: 'User email' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 20, { message: 'Password must be between 8 and 20' })
  readonly password: string;
}
