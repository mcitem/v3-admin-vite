export interface Category {
  id: number
  name: string
}

export interface CategoryList {
  id: number
  name: string
}

export interface DeleteCategoryAPIRequestData {
  id: number
}
export interface AddCategoryAPIRequestData {
  name: string
}

export interface AddCategoryAPIResponseData {
  code: number
  msg: string
}
export interface DeleteCategoryAPIResponseData {
  code: number
  msg: string
}

export type CategoryListResponseData = ApiResponseData<CategoryList[]>
