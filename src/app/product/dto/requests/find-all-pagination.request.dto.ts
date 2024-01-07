import { IsEnum, IsOptional } from 'class-validator';
import { CommonPaginationRequestDto } from '../../../common/dto/requests/common-paginate.request.dto';
import { ProductProperties } from '../../enums/product-properties.enum';
import { ToBoolean } from '../../../common/transform/to-boolean.decorator';

export class FindPaginationAdminUserDto extends CommonPaginationRequestDto {
  @IsOptional()
  @IsEnum(ProductProperties)
  sortBy?: ProductProperties;

  @IsOptional()
  @ToBoolean()
  createdByMe?: boolean = false;
}
