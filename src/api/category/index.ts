import { request } from "@/utils/service"
import type * as Category from "./types/category"

export async function GetCategoryList() {
  return await request<Category.CategoryListResponseData>({
    url: "category/list",
    method: "get"
  })
}

export async function DeleteCategoryAPI(data: Category.DeleteCategoryAPIRequestData) {
  return await request<Category.DeleteCategoryAPIResponseData>({
    url: "category/delete",
    method: "post",
    data
  })
}

export async function AddCategoryAPI(data: Category.AddCategoryAPIRequestData) {
  return await request<Category.AddCategoryAPIResponseData>({
    url: "category/add",
    method: "post",
    data
  })
}

export async function UpdateCategoryAPI(data: Category.Category) {
  return await request<Category.AddCategoryAPIResponseData>({
    url: "category/update",
    method: "post",
    data
  })
}
