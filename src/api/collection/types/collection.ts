export interface AddCollectionRequestsData {
  title: string
  subtitle: string
  description: string
  text: string
  main_image: string
  category_id?: Number
}

export interface AddCollectionResponseData {
  code: number
  msg: string
}

export interface UploadImageResponseData {
  code: number
  msg: string
  picURL: string
}

export interface CollectionListData {
  [key: string]: any
  id: number
  title: string
  subtitle: string
  description: string
  main_image: string
  category_id: number | null | string
}
export interface GetCollectioListResponseData {
  code: number
  msg: string
  page: number
  pre_page: number
  total: number
  total_page: number
  category_id: number
  data: CollectionListData[]
}

export interface GetCollectionListAPItypes {
  output_type?: string
  page?: number
  per_page?: number
  category_id?: number
}

export interface DeleteCollectionRequestsData {
  collection_id: number
}
export interface DeleteCollectionResponsesData {
  code: number
  msg: string
}
