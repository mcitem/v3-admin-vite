export interface User {
  id: number
  unionid: string
  phoneNo: string
  nickname: string
  avatar: string
  is_active: boolean
  is_admin: boolean
}

export interface UserListResponseData {
  code: number
  msg: string
  page: number
  pre_page: number
  total: number
  total_page: number
  data: User[]
}
