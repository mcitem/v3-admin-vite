<script lang="ts" setup>
import { onMounted } from "vue"
import { computed, ref } from "vue"

import { GetCategoryList } from "@/api/category"
import { UploadCollectionImageAPI } from "@/api/collection"

import type { CategoryList } from "@/api/category/types/category"

import { Plus } from "@element-plus/icons-vue"
import { ElUpload } from "element-plus"
import { ElMessage } from "element-plus"
import { AddCollectionRequestsData } from "@/api/collection/types/collection"
import { AddCollectionAPI } from "@/api/collection"
// 图片上传
const beforeUpload = async (file: File) => {
  if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
    ElMessage.error("仅支持上传jpg、jpeg、png格式的图片")
    return false
  }
  const res = await UploadCollectionImageAPI(file)
  if (res.code === 20000) {
    input.value.main_image = res.picURL
    imageURL.value = import.meta.env.VITE_UPLOAD_URL + res.picURL
  } else {
    console.log("上传失败")
    ElMessage.error("上传失败")
  }
  return false
}

const imageURL = ref("")
const initINPUT: AddCollectionRequestsData = {
  title: "",
  subtitle: "",
  description: "",
  text: "",
  main_image: "",
  category_id: 0
}
const input = ref<AddCollectionRequestsData>({ ...initINPUT })
const options = ref<CategoryList[]>([])

const isAllNotEmpty = computed(() => {
  return Object.values(input.value).every((field) => field !== "")
})

const submit = () => {
  console.log(isAllNotEmpty.value)
  console.log(input.value)
  if (isAllNotEmpty.value) {
    AddCollectionAPI(input.value).then((res) => {
      if (res.code === 20000) {
        ElMessage.success("添加成功")
        input.value = { ...initINPUT }
        imageURL.value = ""
      } else {
        ElMessage.error("添加失败")
      }
    })
  } else {
    ElMessage.error("请填写完整信息")
  }
}
onMounted(async () => {
  const res = await GetCategoryList()
  if (res.code === 20000) {
    options.value.push(...res.data)
  }
})
</script>

<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>添加藏品</span>
        </div>
      </template>
      <div class="flex">
        <div class="flex_item main_image">
          <div class="desc"><span>*</span>主图</div>

          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <img v-if="imageURL" :src="imageURL" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="desc"><span>*</span>分类</div>
          <el-select class="el-select" v-model="input.category_id" placeholder="请选择分类">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>

        <div class="flex_item divider_item"><el-divider direction="vertical" class="divider" /></div>
        <div class="flex_item main_input">
          <div class="desc"><span>*</span>标题</div>
          <el-input placeholder="请输入标题" v-model="input.title" style="font-size: larger" />
          <div class="desc"><span>*</span>副标题</div>
          <el-input placeholder="请输入副标题" v-model="input.subtitle" style="font-size: large" />
          <div class="desc"><span>*</span>简要描述</div>
          <el-input
            placeholder="请输入简要描述"
            v-model="input.description"
            type="textarea"
            rows="4"
            style="font-size: large"
          />
        </div>
      </div>
      <div class="card_main">
        <div class="desc"><span>*</span>藏品简介</div>
        <el-input placeholder="请输入藏品简介" v-model="input.text" type="textarea" rows="10" />
      </div>
      <template #footer>
        <el-button type="primary" @click="submit">提交</el-button>
      </template>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.desc {
  margin: 8px 0;
  span {
    color: red;
    margin-right: 6px;
  }
}
// .el-select {
//   margin-top: 8px;
// }
.main_input {
  width: 100%;
}
.card_main {
  margin-top: 20px;
}
.divider {
  min-height: 100%;
}
.divider_item {
  max-width: min-content;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
html {
  --mcitem-upload-bg: #f8f8f8;
}
.dark {
  --mcitem-upload-bg: #1f1f1f;
}
.dark-blue {
  --mcitem-upload-bg: #001b44;
}

.avatar-uploader .el-upload {
  background-color: var(--mcitem-upload-bg);
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
