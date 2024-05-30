import { request } from "@/utils/service"
import type * as User from "./types/user"

export async function GetUserListAPI() {
  return await request<User.UserListResponseData>({
    url: "user/list",
    method: "get"
  })
}
