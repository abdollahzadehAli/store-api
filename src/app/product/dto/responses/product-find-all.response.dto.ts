import { Product } from '../../entities/product.entity';

export class ProductFindAllResponseDto {
  constructor(data: Product) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.title = data.title;
    this.createdBy = data.createdBy ? data.createdBy.fullName : null;
  }
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  createdBy: string;
}
