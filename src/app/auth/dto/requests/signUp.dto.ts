import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignUpDto {
  @Length(2)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Length(3)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minNumbers: 2,
    minSymbols: 1,
    minUppercase: 2,
  })
  password: string;
}
