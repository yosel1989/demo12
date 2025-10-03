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


export interface DatatableQueryParamsDto{
  info: string;
	start: number;
	order: string;
	length: number;
	draw: number;
}