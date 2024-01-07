import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../user/entities/user.entity';
import { CreateProductRequestDto } from '../dto/requests/create-product.request.dto';
import { ProductResponseDto } from '../dto/responses/product.response.dto';
import { FindPaginationAdminUserDto } from '../dto/requests/find-all-pagination.request.dto';
import { ParseIdPipe } from '../../common/decorators/pipes/parse-id-pipe.decorator';
import { UpdateProductRequestDto } from '../dto/requests/update-product.request.dto';
import { OptionalAuth } from '../../auth/decorators/optional-auth.decorator';
import { Public } from '../../auth/decorators/is-public.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductRequestDto,
    @GetUser() user: User,
  ): Promise<ProductResponseDto> {
    return new ProductResponseDto(
      await this.productService.create(createProductDto, user),
    );
  }

  @Public()
  @OptionalAuth()
  @Get()
  async getAll(
    @Query() findAllDto: FindPaginationAdminUserDto,
    @GetUser() user: User,
  ) {
    return await this.productService.getAll(findAllDto, user);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIdPipe) id: number) {
    return new ProductResponseDto(await this.productService.getOne(id));
  }

  @Put(':id')
  async update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateProductDto: UpdateProductRequestDto,
    @GetUser() user: User,
  ): Promise<ProductResponseDto> {
    return new ProductResponseDto(
      await this.productService.update(id, updateProductDto, user),
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIdPipe) id: number, @GetUser() user: User) {
    return await this.productService.delete(id, user);
  }
}
