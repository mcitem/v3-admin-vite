import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登录并返回 Token */
export async function loginApi(data: Login.LoginRequestData) {
  return await request<Login.LoginResponseData>({
    url: "user/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.GetUserinfoResponseData>({
    url: "user/info",
    method: "get"
  })
}
