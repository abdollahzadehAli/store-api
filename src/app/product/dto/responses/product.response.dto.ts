import { Product } from '../../entities/product.entity';

export class ProductResponseDto {
  constructor(data: Product) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.title = data.title;
    this.description = data.description;
    this.createdBy = data.createdBy ? data.createdBy.fullName : null;
  }
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  createdBy: string;
}
