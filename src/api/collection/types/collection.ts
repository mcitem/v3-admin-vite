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
  id: number
  title: string
  subtitle: string
  description: string
  main_image: string
}
export interface GetCollectioListResponseData {
  code: number
  msg: string
  data: CollectionListData[]
}
