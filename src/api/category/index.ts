import { request } from "@/utils/service"
import type * as Category from "./types/category"

export async function GetCategoryList() {
  return await request<Category.CategoryListResponseData>({
    url: "category/list",
    method: "get"
  })
}
