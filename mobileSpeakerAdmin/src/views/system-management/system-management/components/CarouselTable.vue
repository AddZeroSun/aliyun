<template>
  <div class="carousel_content">
    <div class="carousel_table">
      <div class="nav_title_content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">标题</span>
              <el-input v-model="searchData.title" class="pub_input_input" placeholder="请输入标题" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">是否显示</span>
              <el-select v-model="searchData.is_show" class="pub_input_input" placeholder="请选择是否显示">
                <el-option v-for="item in accordingTo" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="3">
            <div>
              <el-button type="primary" @click="resetSearch">重置</el-button>
              <el-button type="primary" @click="refreshTable">查找</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row class="nav_top">
        </el-row> -->
      </div>
      <el-row class="table_top_btn">
        <!-- <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-button type="danger" :disabled="isNotBatch" @click="batchDelete()">批量删除</el-button>
        </el-col> -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-button type="primary" class="add_btn" @click="addBanner()">添加</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" style="width: 100%" border>
        <!-- <el-table-column type="selection" align="center" /> -->
        <el-table-column align="center" property="id" label="ID" width="80" />
        <el-table-column align="center" property="sort" label="权重" width="80" />
        <!-- <el-table-column
          label="权重"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="false">{{ scope.row.name }}</span>
            <el-input-number v-model="scope.row.number" size="mini" :min="1"></el-input-number>
          </template>
        </el-table-column> -->
        <el-table-column label="图片" align="center" width="240">
          <template slot-scope="scope">
            <img :src="scope.row.image" min-width="180" height="140" />
          </template>
        </el-table-column>
        <el-table-column align="center" property="title" label="标题" width="150" />
        <el-table-column align="center" property="desc" label="描述" width="240" />
        <el-table-column align="center" property="callback_url" label="链接地址" width="240" />
        <el-table-column align="center" property="is_show_text" label="是否显示" />
        <el-table-column align="center" property="add_time" label="添加时间" width="100" />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editBanner(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="page.total_page" class="pagination_body">
        <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { bannerList, bannerDelete, bannerBatchDelete } from '@/api/systemManagement.js'
export default {
  name: 'CarouselTable', // 系统管理
  components: {
  },
  //   mixins: [mixin],
  data() {
    return {
      // 搜索内容
      searchData: {
        title: '', // 标题
        is_show: '' // 是否显示
      },
      tableData: [],
      isNotBatch: true,
      multipleSelection: [], // 多选
      // 显示/隐藏
      accordingTo: [
        { id: '', name: '全部' },
        { id: 1, name: '显示' },
        { id: 0, name: '隐藏' }
      ],
      // 分页器
      page: {
        currentPage: 1,
        pageSizes: [15, 30, 45, 50, 100],
        pageSize: 15,
        total: 20,
        total_page: ''
      }
    }
  },
  computed: {
    // ...mapGetters(['name'])
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created() {
    this.keyupSubmit()
    this.drawTable()
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 回车事件
    keyupSubmit() {
      document.onkeydown = e => {
        const _key = window.event.keyCode
        if (_key === 13) {
          this.refreshTable()
        }
      }
    },
    // 获取列表
    bannerListData() {
      const data = {
        title: this.searchData.title,
        is_show: this.searchData.is_show,
        page_size: this.page.pageSize,
        page: this.page.currentPage
      }
      bannerList(data).then(res => {
        if (res.data && res.code === 200) {
          this.tableData = res.data
          this.page.total_page = parseInt(res.total)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加轮播
    addBanner(index, row) {
      this.$router.push({
        name: 'add-carousel-management',
        query: { type: 0 }
      })
    },
    // 编辑轮播
    editBanner(index, row) {
      this.$router.push({
        name: 'edit-carousel-management',
        query: { id: row.id, type: 1 }
      })
    },
    // 单例删除
    handleDelete(_index, _id) {
      this.$confirm('确认删除 ID: ' + _id + ' ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const jsonData = {
          id: _id
        }
        bannerDelete(jsonData).then(res => {
          if (res && res.code === 200) {
            this.refreshTable() // 刷新列表
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    batchDelete() {
      this.$confirm('此操作将永久删除选中文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = this.multipleSelection
        bannerBatchDelete(formData).then(res => {
          if (res && res.code === 200) {
            this.refreshTable() // 刷新列表
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 判断是否批量选择
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length > 0) {
        this.isNotBatch = false
      } else {
        this.isNotBatch = true
      }
    },
    resort() {
      console.log('new sort')
    },
    // 渲染表格
    drawTable() {
      this.bannerListData()
    },
    // 刷新表格
    refreshTable() {
      this.page.currentPage = 1
      this.drawTable()
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.drawTable()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.drawTable()
    },
    // 重置
    resetSearch() {
      this.searchData.title = '' // 标题
      this.searchData.is_show = '' // 显示/隐藏
      this.refreshTable()
    }
  }
}
</script>

<style lang="scss">
  .carousel_content {
    .carousel_table {
      .pagination_body {
        padding-top: 20px;
        text-align: right;
      }
    }
  }
</style>
<style lang="scss" scoped>
.carousel_content {
  .carousel_table {
    .table_img {
      max-width: 200px;
      max-height: 120px;
    }
    .table_top_btn {
      margin-bottom: 15px;
      padding-top: 20px;
    }
    .add_btn {
      float: right;
    }
    .nav_top {
      padding-top: 20px;
    }
    .pub_input_content {
      width: 100%;
      overflow: hidden;
      padding-right: 16px;
    }
    .pub_input_title {
      // width: 30%;
      width: 75px;
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .pub_input_input {
      width: 70%;
      float: left;
      height: 40px;
    }
    .find_btn {
      float: right;
    }
  }
}
</style>
