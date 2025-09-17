export interface PaginationDto {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  length: number;
  page: number;
}


export interface TableCollectionResponse<T> {
  data: T;
  pagination: PaginationDto;
}