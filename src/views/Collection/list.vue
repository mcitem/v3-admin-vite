<script setup lang="ts">
import { onMounted, ref, computed } from "vue"

import { GetCategoryList } from "@/api/category"
import { GetCollectionListAPI } from "@/api/collection"
import { DeleteCollectionAPI } from "@/api/collection"

// import { Search, Refresh } from "@element-plus/icons-vue"
// import { CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"

import { ElMessage, type TableColumnCtx } from "element-plus"
import type { CategoryList } from "@/api/category/types/category"
import type { CollectionListData, GetCollectionListAPItypes } from "@/api/collection/types/collection"

// const searchData = ref({
//   username: "",
//   phone: ""
// })
const tableData = ref<CollectionListData[]>([])
const paginationData = ref({
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: [5, 10, 20, 50],
  total: 0,
  total_page: 0,
  pre_page: 5, //需要同时修改update函数 更改默认值
  currentPage: 1
})
const categoryList = ref<CategoryList[]>([])
const categoryFilters = computed(() => {
  return categoryList.value.map((item) => {
    return { text: item.name, value: item.name }
  })
})

const categotyfilterHandler = (value: string, row: CollectionListData, column: TableColumnCtx<CollectionListData>) => {
  const property = column["property"] // 字段名，如“category_id”
  return row[property] == value
}
const updateTableData = async ({ page = 1, per_page = 5, output_type = "less" }: GetCollectionListAPItypes = {}) => {
  const res = await GetCollectionListAPI({ page, per_page, output_type })
  tableData.value = res.data.map((item) => {
    const { name } = categoryList.value.find((jtem) => {
      return jtem.id === item.category_id
    }) ?? { name: "找不到分类" }
    return {
      ...item,
      main_image: import.meta.env.VITE_UPLOAD_URL + item.main_image,
      category_id: name
    }
  })
  paginationData.value.total = res.total
  paginationData.value.total_page = res.total_page
  paginationData.value.currentPage = page
}

onMounted(async () => {
  categoryList.value = (await GetCategoryList()).data
  await updateTableData()
})
const handleSizeChange = async (val: number) => {
  paginationData.value.pre_page = val
  await updateTableData({ per_page: val })
}

const handleCurrentChange = async (val: number) => {
  paginationData.value.currentPage = val
  await updateTableData({ page: val })
}

const deleteCollection = async (id: number) => {
  ConfirmDeleteVisible.value = 0
  console.log(id)
  const res = await DeleteCollectionAPI({ collection_id: id })
  if (res.code == 20000) {
    ElMessage.success(res.msg)
    tableData.value = tableData.value.filter((item) => item.id !== id)
  }
}
const ConfirmDeleteVisible = ref<Number>(0)
const previewSrcList = computed(() => {
  return tableData.value.map((item) => item.main_image)
})
</script>
<template>
  <div class="app-container">
    <!-- <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="搜索">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search">查询</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->

    <el-card shadow="never">
      <template #header>
        <div>藏品列表</div>
      </template>
      <!-- <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus">add</el-button>
          <el-button type="danger" :icon="Delete">del</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle />
          </el-tooltip>
        </div>
      </div> -->
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />

          <el-table-column prop="username" label="主图" align="center">
            <template #default="{ row, $index }">
              <el-image
                style="width: 50px; height: 50px"
                :src="row.main_image"
                fit="cover"
                :preview-src-list="previewSrcList"
                :preview-teleported="true"
                :initial-index="$index"
                :z-index="999"
                :infinite="false"
              />
            </template>
          </el-table-column>

          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column prop="subtitle" label="副标题" align="center" />
          <el-table-column prop="description" label="描述" align="center" />
          <el-table-column
            prop="category_id"
            label="分类"
            align="center"
            :filters="categoryFilters"
            :filter-method="categotyfilterHandler"
          />

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="{ row }">
              <el-button type="primary" text bg size="small">修改</el-button>

              <el-popover :visible="ConfirmDeleteVisible == row.id" placement="top" :width="160">
                <p>Are you sure to delete this?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" text @click="ConfirmDeleteVisible = 0">cancel</el-button>
                  <el-button size="small" type="primary" @click="deleteCollection(row.id)"> confirm </el-button>
                </div>
                <template #reference>
                  <el-button type="danger" text bg size="small" @click="ConfirmDeleteVisible = row.id">删除</el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="paginationData.pageSizes"
          :page-count="paginationData.total_page"
          :total="paginationData.total"
          :page-size="paginationData.pre_page"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <!-- <el-dialog
      v-model="dialogVisible"
      :title="编辑藏品"
      @closed="resetForm"
      width="30%"
    >
      <el-form ref="formRef" label-width="100px" label-position="left">
        <el-form-item prop="username" label="用户名">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button>取消</el-button>
        <el-button type="primary" :loading="loading">确认</el-button>
      </template>
    </el-dialog> -->
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
