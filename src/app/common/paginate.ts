import { SelectQueryBuilder } from 'typeorm';
import CommonPaginationResponseDto from './dto/responses/common-pagination.response.dto';
import { PaginationOptions } from './types/pagnite-options';

export const paginate = async (
  query: SelectQueryBuilder<any>,
  paginationOptions: PaginationOptions,
  sortOptions: { isDesc: any; sortBy: string },
  ResponseDto: any,
) => {
  let pagination: { count: number; pageSize: number; page: number };
  if (sortOptions) {
    const { sortBy, isDesc } = sortOptions;
    if (sortBy) {
      query.orderBy(sortBy, isDesc ? 'DESC' : 'ASC');
    }
  }
  if (paginationOptions) {
    const { page, pageSize } = paginationOptions;
    if (page && pageSize) {
      const count = await query.getCount();
      query.skip((page - 1) * pageSize);
      query.take(pageSize);
      pagination = {
        count,
        pageSize,
        page,
      };
    }
  }
  const result = await query.getMany();
  const parsedResult = result.map((item) => new ResponseDto(item));
  return new CommonPaginationResponseDto(parsedResult, pagination);
};
