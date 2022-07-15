export interface Base {
  id: number
}


export interface IPagination<T extends Base> {
  pageNumber: number,
  pageSize: number,
  totalCount: number,
  data: T[]
}
