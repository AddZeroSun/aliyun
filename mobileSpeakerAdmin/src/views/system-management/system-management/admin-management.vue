<template>
  <div class="admin_management_container">
    <el-card class="admin_management_card">
      <div slot="header" class="admin_management_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="2">
            <div class="admin_management_header_list">
              <span>{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nav_title_content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">管理员ID</span>
              <el-input v-model="searchData.id" class="pub_input_input" placeholder="请输入用户ID" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">名称</span>
              <el-input v-model="searchData.name" class="pub_input_input" placeholder="请输入管理员名称" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title pub_input_phone">手机号</span>
              <el-input v-model="searchData.phone" class="pub_input_input pub_input_input_phone" placeholder="请输入用户手机号" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="3" class="find_btn">
            <div>
              <el-button type="primary" @click="resetSearch">重置</el-button>  <el-button type="primary" @click="refreshTable">查找</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row class="nav_top">

        </el-row> -->
      </div>
      <div class="table_content">
        <el-tabs v-model="showType" class="tab_con" @tab-click="changeShowtype">
          <el-tab-pane label="全部管理员" name="0">
            <admin-management-table :datalist="tableData" @open-editor="openEdit" @open-add="openAdd"></admin-management-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import defaultSettings from '@/settings'
import { adminList, deleteAdmin } from '@/api/systemManagement.js'
import AdminManagementTable from './components/AdminManagementTable'
export default {
  name: 'AdminManagement', // 权限管理
  components: {
    AdminManagementTable
  },
  data() {
    return {
      loading: false,
      showType: '0',
      // 搜索内容
      searchData: {
        id: '', // 管理员id
        name: '', // 管理员名称
        phone: '' // 管理员手机号
      },
      // 表格数据
      tableData: [],
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
    ...mapGetters([
      'name'
    ])
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
    // 获取列表
    this.drawTable()
  },
  mounted() {
  },
  destroyed() {
  },
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
    // 切换显示隐藏
    changeShowtype(tab, event) {
      switch (parseInt(this.showType)) {
        case 0:
          this.searchData.status = ''
          this.refreshTable()
          break
        case 1:
          this.searchData.status = 4
          this.refreshTable()
          break
        case 2:
          this.searchData.status = 1
          this.refreshTable()
          break
        case 3:
          this.searchData.status = 5
          this.refreshTable()
          break
        default:
          this.searchData.status = ''
          this.refreshTable()
          break
      }
    },
    // 获取列表
    adminListData() {
      const data = {
        id: this.searchData.id,
        name: this.searchData.name,
        phone: this.searchData.phone,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      adminList(data).then(res => {
        if (res.data && res.code === 200) {
          this.tableData = res.data
          this.page.total_page = parseInt(res.total)
          if (this.page.total_page < 2) {
            this.page.total = this.tableData.length
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加
    openAdd() {
      this.$router.push({
        name: 'add-admin-management',
        query: {}
      })
    },
    // 编辑
    openEdit(_type, _row) {
      if (_type === 0) {
        this.$router.push({
          name: 'add-admin-management',
          query: { row: '', type: _type }
        })
      } else if (_type === 1) {
        this.$router.push({
          name: 'edit-admin-management',
          query: {
            user_id: _row.id,
            username: _row.username,
            phone: _row.phone,
            user_head: _row.user_head,
            type: _type
          }
          // query: {
          //   row: _row,
          //   type: _type
          // }
        })
      } else if (_type === 2) {
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const jsonData = {
            id: _row.id
          }
          deleteAdmin(jsonData).then(res => {
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
      }
    },
    // 渲染表格
    drawTable() {
      this.adminListData()
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
      this.searchData.id = '' // 管理员id
      this.searchData.name = '' // 管理员名称
      this.searchData.phone = '' // 管理员手机号
      this.refreshTable()
    }
  }
}
</script>

<style lang="scss">
.admin_management_container {
    .admin_management_card {
      .tab_con {
        padding-left: 20px;
        padding-right: 20px;
      }
      .el-card__header {
        padding: 8px 10px;
      }
      .el-card__body {
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 0px;
      }
      .add_btn {
        float: right;
      }
      .pagination_body {
        padding-top: 20px;
        text-align: right;
      }
    }
    .num_con {
      width: 180px;
    }
    .pub_input_input_phone .el-input__inner{
      padding-left: 5px;
    }
}
</style>
<style lang="scss" scoped>
.admin_management_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  // 搜索框样式
  .table_content {
    padding-top: 20px;
  }
  .nav_top {
    padding-top: 20px;
  }
  .nav_title_content {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
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
  .pub_input_phone {
    // width: 41%;
  }
  .pub_input_input_phone {
    width: 59%;
  }
  .pub_input_price_hr {
    float: left;
    width: 10%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .find_btn {
    float: right;
  }
  .admin_management_header {
    // padding-top: 20px;
  }
  .admin_management_header_list {
    height: 40px;
    line-height: 40px;
  }
  .header_list_title {
    padding-left: 15px;
  }
  // 公共样式价格
  .pub_price {
    font-size: 18px;
    color: red;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  .msg {
    font-size: 13px;
    color: #999999;
    margin: 0;
  }
  .editor_img {
    width: 70px;
    height: 70px;
  }
}
</style>
