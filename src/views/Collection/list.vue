<script setup lang="ts">
import { onMounted, ref } from "vue"
import { GetCollectionListAPI } from "@/api/collection"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { CollectionListData } from "@/api/collection/types/collection"
const searchData = ref({
  username: "",
  phone: ""
})
const tableData = ref<CollectionListData[]>([])
onMounted(async () => {
  const res = await GetCollectionListAPI()
  tableData.value.push(
    ...res.data.map((item) => {
      return {
        ...item,
        main_image: import.meta.env.VITE_UPLOAD_URL + item.main_image
      }
    })
  )
})
</script>
<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="搜索">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search">查询</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />

          <el-table-column prop="username" label="主图" align="center">
            <template #default="{ row }">
              <el-image style="width: 50px; height: 50px" :src="row.main_image" fit="cover" />
            </template>
          </el-table-column>

          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column prop="subtitle" label="副标题" align="center" />
          <el-table-column prop="description" label="描述" align="center" />

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default>
              <el-button type="primary" text bg size="small">修改</el-button>
              <el-button type="danger" text bg size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <!-- <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <!-- <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? '新增用户' : '修改用户'"
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
