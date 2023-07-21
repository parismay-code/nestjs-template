import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Role name' })
  readonly name: string;
  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  readonly description: string;
}
