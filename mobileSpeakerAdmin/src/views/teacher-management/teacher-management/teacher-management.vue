<template>
  <div class="account_management_container">
    <el-card class="account_management_card">
      <div slot="header" class="account_management_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <div class="account_management_header_list">
              <span>{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="3" :lg="2" :xl="2" class="add_btn">
            <div>
              <el-button type="primary" @click="openAdd('', 0)">添加名师</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nav_title_content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">名师ID</span>
              <el-input v-model="searchData.teacher_id" class="pub_input_input" placeholder="请输入名师ID" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">手机号</span>
              <el-input v-model="searchData.teacher_phone" class="pub_input_input" placeholder="请输入手机号" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">名师名称</span>
              <el-input v-model="searchData.teacher_name" class="pub_input_input" placeholder="请输入名师名称" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">是否显示</span>
              <el-select v-model="searchData.is_show" filterable clearable class="pub_input_input" placeholder="请选择是否显示">
                <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="nav_top">
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">审核状态</span>
              <el-select v-model="searchData.status" filterable clearable class="pub_input_input" placeholder="请选择审核状态">
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="8">
            <div class="pub_input_content">
              <span class="pub_input_title pub_input_title_data">添加时间</span>
              <el-date-picker
                v-model="searchData.start_time"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="pub_input_input pub_input_data"
                type="datetimerange"
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="3" :xl="3" class="find_btn">
            <div>
              <el-button type="primary" @click="resetSearch">重置</el-button>  <el-button type="primary" @click="refreshTable">查找</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table_content">
        <el-table ref="singleTable" border :data="tableData" highlight-current-row>
          <el-table-column align="center" property="sort" width="70" label="权重" />
          <el-table-column align="center" property="id" label="名师ID" width="120" />
          <el-table-column align="center" label="头像" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.head" min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column align="center" property="name" show-overflow-tooltip label="名师名称" />
          <el-table-column align="center" property="sex" show-overflow-tooltip label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex === 1">男</span>
              <span v-if="scope.row.sex === 2">女</span>
            </template>
          </el-table-column>
          <el-table-column align="center" property="phone" label="名师手机号" />
          <el-table-column align="center" property="is_show" label="是否显示">
            <template slot-scope="scope">
              <span v-if="scope.row.is_show === 1">显示</span>
              <span v-if="scope.row.is_show === 2">隐藏</span>
            </template>
          </el-table-column>
          <el-table-column align="center" property="is_recommend" label="是否推荐">
            <template slot-scope="scope">
              <span v-if="scope.row.is_recommend === 1">推荐</span>
              <span v-if="scope.row.is_recommend === 2">不推荐</span>
            </template>
          </el-table-column>
          <el-table-column align="center" property="add_time" show-overflow-tooltip label="添加时间" />
          <el-table-column align="center" label="状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">待审核</span>
              <span v-if="scope.row.status === 2">已通过</span>
              <span v-if="scope.row.status === 3">已拒绝</span>
              <span v-if="scope.row.status === 4">黑名单</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" @click="freezeData(scope.row.id)">冻结</el-button> -->
              <el-button type="text" size="small" @click="openAdd(scope.row.id, 1, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination_body">
          <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <!-- 后台管理 -->
        <!-- <el-dialog title="后台管理" :visible.sync="showDialog" width="500px">
          <div>
            <account-management-dialog ref="AccountManagementDialog" :type="type" :list="rowList" />
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="save">确 定</el-button>
          </div>
        </el-dialog> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { teacherList } from '@/api/teacherManagement.js'
// import AccountManagementDialog from '../components/AccountManagementDialog.vue'
export default {
  name: 'AccountManagement', // 账号管理
  components: {
    // AccountManagementDialog
  },
  data() {
    return {
      type: 0,
      rowList: {},
      // 添加，编辑
      showDialog: false,
      loading: false,
      admin_id: '', // 登录用户userID
      // 搜索内容
      searchData: {
        teacher_id: '', // 名师ID
        teacher_phone: '', // 名师手机号
        teacher_name: '', // 名师名称
        is_show: '', // 是否显示
        status: '', // 审核状态
        start_time: '' // 添加时间 起始时间start_time[0] 收尾时间start_time[1]
      },
      admin_data: {
        id: '',
        phone: '', // 手机号
        username: '', // 用户名
        admin_id: '', // 用户名
        app_id: '',
        status: ''// 状态
      },
      platformList: [
        { id: 1, name: '显示' },
        { id: 2, name: '隐藏' }
      ],
      statusList: [
        { id: 1, name: '待审核' },
        { id: 2, name: '已通过' },
        { id: 3, name: '已拒绝' },
        { id: 4, name: '黑名单' }
      ],
      // 表格数据
      tableData: [],
      page: {
        currentPage: 1,
        pageSizes: [15, 30, 45, 50, 100],
        pageSize: 15,
        total: 20,
        total_page: 2
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
    // 获取管理员列表
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
    // 获取管理员列表
    getTeacherListData() {
      // 当时间选择器点击清空时,会将时间赋值为null,造成无法通过数组下标取值
      // 判断为null的时候就转换为一个二维数组
      let searchTime = ['', '']
      if (!this.searchData.start_time) {
        searchTime = ['', '']
      } else {
        searchTime = this.searchData.start_time
      }
      const jsonData = {
        // id: 1,
        id: this.searchData.teacher_id,
        phone: this.searchData.teacher_phone,
        name: this.searchData.teacher_name,
        is_show: this.searchData.is_show,
        status: this.searchData.status,
        start_time: searchTime[0], // 已转换,不会是null或undefined,放心食用
        end_time: searchTime[1],
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      teacherList(jsonData).then(res => {
        if (res && res.code === 200) {
          this.tableData = res.data
          this.page.total_page = parseInt(res.total)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加
    addAdminData() {
      // this.loading = true
      // const formData = new FormData()
      // formData.append('phone', this.admin_data.phone)
      // formData.append('username', this.admin_data.username)
      // formData.append('status', this.admin_data.status)
      // formData.append('admin_id', this.admin_data.admin_id)
      // formData.append('app_id', this.admin_data.app_id)
      // addAdmin(formData).then(res => {
      //   if (res.data && res.status === 200) {
      //     // console.log(res)
      //     this.$message({
      //       message: res.message,
      //       type: 'success'
      //     })
      //     this.refreshTable()
      //     this.loading = false
      //     this.showDialog = false
      //   } else {
      //     this.$message({
      //       message: res.message,
      //       type: 'warning'
      //     })
      //     this.loading = false
      //   }
      // }).catch(err => {
      //   this.loading = false
      //   console.log(err)
      // })
    },
    // 修改
    editAdminData() {
      // this.loading = true
      // const formData = new FormData()
      // formData.append('id', this.admin_data.id)
      // formData.append('status', this.admin_data.status)
      // editAdmin(formData).then(res => {
      //   if (res.data && res.status === 200) {
      //     // console.log(res)
      //     this.$message({
      //       message: res.message,
      //       type: 'success'
      //     })
      //     this.refreshTable()
      //     this.loading = false
      //     this.showDialog = false
      //   } else {
      //     this.$message({
      //       message: res.message,
      //       type: 'warning'
      //     })
      //     this.loading = false
      //   }
      // }).catch(err => {
      //   this.loading = false
      //   console.log(err)
      // })
    },
    // 权限验证
    checkAdminAuthData(callback) {
      // this.admin_id = localStorage.getItem('userId')
      // const formData = new FormData()
      // formData.append('admin_id', this.admin_id)
      // checkAdminAuth(formData).then(res => {
      //   callback(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 添加编辑
    openAdd(_id, _type) {
      if (_type === 0) {
        this.$router.push({
          name: 'add-teacher-management',
          query: {
            id: _id,
            type: _type
          }})
      } else if (_type === 1) {
        this.$router.push({
          name: 'edit-teacher-management',
          query: {
            id: _id,
            type: _type
          }})
      }
    },
    // 编辑
    openEtitDialog(_id, _type, _row) {
      const _this = this
      this.type = _type
      this.admin_data.id = _id
      //   this.checkAdminAuthData(function(res) {
      //     if (res.data && res.code === 200) {
      //       _this.showDialog = true
      //       setTimeout(() => {
      //         _this.rowList = _row
      //       }, 500)
      //     } else {
      //       _this.$message({
      //         message: res.message,
      //         type: 'warning'
      //       })
      //     }
      //   })
      _this.showDialog = true
    },
    // 冻结
    freezeData(_id) {
      this.$confirm('确定冻结账户吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const data = {
        //   id: _id,
        //   flag: this.editoBuyingGuide.app_validation_product_id
        // }
        // delAppContent(data).then(res => {
        //   if (res.data && res.status === 200) {
        //     this.$message({
        //       message: res.message,
        //       type: 'success'
        //     })
        //     this.refreshTable()
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })
      }).catch(() => {
      })
    },
    // 保存数据
    save() {
      const _this = this
      _this.$refs.AccountManagementDialog.submitForm().then(res => {
        // console.log('AccountManagementDialog', res)
        if (res.code === 200) {
          this.admin_data.phone = res.data.phone
          this.admin_data.username = res.data.name
          this.admin_data.status = res.data.status
          this.admin_data.admin_id = localStorage.getItem('userId')
          // console.log(res.data.platform)
          this.admin_data.app_id = JSON.stringify(res.data.platform)
          if (this.type === 0) {
            this.addAdminData()
          } else {
            this.editAdminData()
          }
          // console.log('workCon', res)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 渲染表格
    drawTable() {
      this.getTeacherListData()
    },
    // 刷新表格
    refreshTable() {
      this.page.currentPage = 1
      this.drawTable()
    },
    // 重置
    resetSearch() {
      this.searchData.teacher_id = ''
      this.searchData.teacher_phone = ''
      this.searchData.teacher_name = ''
      this.searchData.is_show = ''
      this.searchData.status = ''
      this.searchData.start_time = ''
      this.refreshTable()
    },
    // 分页
    handleSizeChange(val) {
      this.page.pageSize = val
      this.refreshTable()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.drawTable()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
.account_management_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .nav_top {
    padding-top: 20px;
  }
  .table_content {
    padding-top: 20px;
  }
  .nav_title_content {
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
  .pub_input_phone {
    width: 102px;
  }
  .pub_input_input {
    width: 70%;
    float: left;
    height: 40px;
  }
  .pub_input_price_hr {
    float: left;
    width: 10%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .pub_input_price {
    width: 34%;
  }
  .find_btn {
    float: right;
  }
  .nav_top {
    padding-top: 20px;
  }
  .account_management_card {
    .el-card__header {
      padding: 8px 10px;
    }
    .el-card__body {
      padding-left: 0px;
      padding-right: 0px;
    }
    .add_btn {
      float: right;
      text-align: right;
    }
    .pagination_body {
      padding-top: 20px;
      text-align: right;
    }
  }
  .account_management_header {
    // padding-top: 20px;
  }
  .account_management_header_list {
    height: 40px;
    line-height: 40px;
  }
  .header_list_title {
    padding-left: 15px;
  }
  .el-dialog {
    margin-top: 0vh!important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // 编辑
  .edito_account_management_list {
    padding-right: 15px;
  }
  .edito_account_management_img {
    width: 100%;
    height: 400px;
  }
  .edito_account_management_list_btn {
    position: absolute;
    bottom: 12px;
    right: 0;
  }
  .nav_footer_con {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  // 公共样式价格
  .pub_price {
    font-size: 18px;
    // color: red;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  // 标题样式
  .header_title {
    padding-right: 10px;
  }
  .pub_input_g {
    width: 41%;
  }
  .pub_input_input_g {
    width: 59%;
  }
}
</style>
