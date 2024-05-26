export interface LoginRequestData {
  phoneNo: string
  password: string
}

export interface LoginResponseData {
  code: number
  msg: string
  token: string
}

export interface GetUserinfoResponseData {
  code: number
  msg: string
  data: {
    phoneNo: string
    nickName: string
    avater: string
  }
}
