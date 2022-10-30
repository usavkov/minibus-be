import { MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @MinLength(2)
  @MaxLength(32)
  name: string;
}
