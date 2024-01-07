export default class CommonPaginationResponseDto {
  constructor(
    items: any[],
    pagination: {
      count: number;
      pageSize: number;
      page: number;
    } | null,
  ) {
    this.items = items;
    this.pagination = pagination || null;
    if (this.pagination) {
      this.pagination.page = pagination?.page ? Number(pagination.page) : null;
      this.pagination.count = pagination?.count
        ? Number(pagination.count)
        : null;
      this.pagination.pageSize = pagination?.pageSize
        ? Number(pagination.pageSize)
        : null;
    }
  }
  items: any[];
  pagination: {
    count: number;
    pageSize: number;
    page: number;
  } | null;
}
