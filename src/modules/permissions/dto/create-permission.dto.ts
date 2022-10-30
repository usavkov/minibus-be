import { MinLength, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @MinLength(2)
  @MaxLength(32)
  name: string;
}
