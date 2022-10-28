import {
  MinLength,
  MaxLength,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(32)
  username: string;

  @MinLength(4)
  @MaxLength(256)
  password: string;

  @MaxLength(64)
  firstName: string;

  @MaxLength(64)
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
