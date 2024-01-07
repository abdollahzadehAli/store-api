import { IsNumberString, IsOptional } from 'class-validator';
import { ToBoolean } from '../../transform/to-boolean.decorator';

export class CommonPaginationRequestDto {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;

  @IsOptional()
  search?: string;

  @ToBoolean()
  @IsOptional()
  isDesc?: boolean = true;
}
