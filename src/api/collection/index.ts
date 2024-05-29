import { request } from "@/utils/service"
import type * as Collection from "./types/collection"

export async function AddCollectionAPI(data: Collection.AddCollectionRequestsData) {
  return await request<Collection.AddCollectionResponseData>({
    url: "collection/add",
    method: "post",
    data
  })
}

export async function UploadCollectionImageAPI(file: File) {
  const formData = new FormData()
  formData.append("col_pic", file)

  return await request<Collection.UploadImageResponseData>({
    url: "collection/upload",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export async function GetCollectionListAPI({
  output_type = "less",
  page = 1,
  per_page = 10,
  category_id = -1
}: Collection.GetCollectionListAPItypes = {}) {
  const params = new URLSearchParams()
  if (output_type) params.append("output_type", output_type)
  if (page) params.append("page", page.toString())
  if (per_page) params.append("per_page", per_page.toString())
  if (category_id) params.append("category_id", category_id.toString())

  return await request<Collection.GetCollectioListResponseData>({
    url: `collection/list?${params.toString()}`,
    method: "get"
  })
}

export async function DeleteCollectionAPI(data: Collection.DeleteCollectionRequestsData) {
  return await request<Collection.DeleteCollectionResponsesData>({
    url: "collection/delete",
    method: "post",
    data
  })
}
