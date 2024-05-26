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
