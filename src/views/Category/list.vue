<script setup lang="ts">
import { onMounted, ref } from "vue"

import { GetCategoryList, DeleteCategoryAPI, UpdateCategoryAPI, AddCategoryAPI } from "@/api/category"

import { ElMessage } from "element-plus"
import type { CategoryList } from "@/api/category/types/category"

import { CirclePlus } from "@element-plus/icons-vue"

const categoryList = ref<CategoryList[]>([])
onMounted(async () => {
  categoryList.value = (await GetCategoryList()).data
})
const deleteCategory = async (id: number) => {
  ConfirmDeleteVisible.value = -1
  if (id == 0) {
    ElMessage.error("默认分类不能删除")
    return
  }
  const res = await DeleteCategoryAPI({ id: id })
  if (res.code == 20000) {
    ElMessage.success(res.msg)
    categoryList.value = categoryList.value.filter((item) => item.id !== id)
  }
}
const updateCategory = async (id: number) => {
  if (InputCategory.value == "") {
    ElMessage.error("分类名称不能为空")
    return
  }
  ConfirmUpdateVisible.value = -1
  const res = await UpdateCategoryAPI({ id: id, name: InputCategory.value })
  if (res.code == 20000) {
    ElMessage.success(res.msg)
    categoryList.value = categoryList.value.map((item) => {
      if (item.id == id) {
        item.name = InputCategory.value
        InputCategory.value = ""
      }
      return item
    })
  }
}

const AddCategory = async () => {
  if (InputCategory.value == "") {
    ElMessage.error("分类名称不能为空")
    return
  }
  ConfirmUpdateVisible.value = -1
  const res = await AddCategoryAPI({ name: InputCategory.value })
  if (res.code == 20000) {
    ElMessage.success(res.msg)
    InputCategory.value = ""
    categoryList.value = (await GetCategoryList()).data
  }
}
const ConfirmAddCategoryVisible = ref(false)
const ConfirmDeleteVisible = ref<Number>(-1)
const ConfirmUpdateVisible = ref<Number>(-1)
const InputCategory = ref<string>("")
</script>
<template>
  <div class="app-container">
    <el-card shadow="never">
      <template #header>
        <div>分类列表</div>
      </template>
      <div class="table-wrapper">
        <el-popover :visible="ConfirmAddCategoryVisible" placement="top" :width="160">
          <div>
            <el-input v-model="InputCategory" placeholder="Please input" clearable style="margin-bottom: 10px" />
          </div>
          <div style="text-align: right; margin: 0">
            <el-button size="small" text @click="ConfirmAddCategoryVisible = false">cancel</el-button>
            <el-button size="small" type="primary" @click="AddCategory()"> confirm </el-button>
          </div>
          <template #reference>
            <el-button
              type="primary"
              :icon="CirclePlus"
              class="toolbar-wrapper"
              @click="ConfirmAddCategoryVisible = true"
              >新增分类
            </el-button>
          </template>
        </el-popover>

        <el-table :data="categoryList">
          <el-table-column type="selection" width="50" align="center" />

          <el-table-column prop="name" label="分类名称" align="center" />

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="{ row }">
              <el-popover :visible="ConfirmUpdateVisible == row.id" placement="top" :width="160">
                <div>
                  <el-input v-model="InputCategory" placeholder="Please input" clearable style="margin-bottom: 10px" />
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" text @click="ConfirmUpdateVisible = -1">cancel</el-button>
                  <el-button size="small" type="primary" @click="updateCategory(row.id)"> confirm </el-button>
                </div>
                <template #reference>
                  <el-button type="primary" text bg size="small" @click="ConfirmUpdateVisible = row.id">修改</el-button>
                </template>
              </el-popover>

              <el-popover :visible="ConfirmDeleteVisible == row.id" placement="top" :width="160">
                <p>删除分类后，分类下的藏品会变成默认分类喔</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" text @click="ConfirmDeleteVisible = -1">cancel</el-button>
                  <el-button size="small" type="primary" @click="deleteCategory(row.id)"> confirm </el-button>
                </div>
                <template #reference>
                  <el-button type="danger" text bg size="small" @click="ConfirmDeleteVisible = row.id">删除</el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.toolbar-wrapper {
  margin-bottom: 18px;
}
.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
