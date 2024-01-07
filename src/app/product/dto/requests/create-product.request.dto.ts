import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
