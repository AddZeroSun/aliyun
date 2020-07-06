<template>
  <div class="course-management_container">
    <el-card class="course-management_card">
      <div slot="header" class="course-management_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="2">
            <div class="course-management_header_list">
              <span>{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="1" :xl="1" class="add_btn">
            <div>
              <el-button type="primary" @click="openAdd(0, '')">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nav_title_content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">课程ID</span>
              <el-input v-model="searchData.id" class="pub_input_input" placeholder="请输入课程ID" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">课程名称</span>
              <el-input v-model="searchData.name" class="pub_input_input" placeholder="请输入课程名称" />
            </div>
          </el-col>
        </el-row>
        <el-row class="nav_top">
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">是否显示</span>
              <el-select v-model="searchData.is_show" class="pub_input_input" placeholder="请选择是否显示">
                <el-option v-for="item in accordingTo" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">是否推荐</span>
              <el-select v-model="searchData.is_recommend" class="pub_input_input" placeholder="请选择是否推荐">
                <el-option v-for="item in recommendTo" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="3" :xl="3" class="find_btn">
            <div>
              <el-button type="primary" @click="resetSearch">重置</el-button>
              <el-button type="primary" @click="refreshTable">查找</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table_content">
        <el-tabs v-model="showType" class="tab_con" @tab-click="changeShowtype">
          <el-tab-pane label="全部课程" name="0">
            <course-management-table :datalist="tableData" :statuslist="statusList" @change-sort="changeTableSort" @change-show="changeTableShow" @open-editor="openEdit" @change-stick="changeTableStick" @change-status="changeTableStatus"></course-management-table>
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
import { courseList, editArtistSort, editArtistShow, editArtistStick, editArtistStatus } from '@/api/courseManagement.js'
import CourseManagementTable from './components/CourseManagementTable'
export default {
  name: 'CourseManagement', // 课程管理
  components: {
    CourseManagementTable
  },
  data() {
    return {
      loading: false,
      showType: '0',
      // 搜索内容
      searchData: {
        status: '', // 顶部Tab切换：上架出售->4；下架->1；暂不出售->5
        id: '', // 课程id
        name: '', // 课程名
        teacher_name: '', // 讲师
        state: '', // 状态
        placed_top: '', // 置顶
        is_recommend: '', // 推荐
        is_show: '' // 显示/隐藏
      },
      statusList: [],
      // 状态
      stateList: [
        { id: '', name: '全部' },
        { id: 3, name: '待审核' },
        { id: 1, name: '正常' },
        { id: 2, name: '异常' }
      ],
      // 置顶
      placedTop: [
        { id: '', name: '全部' },
        { id: 1, name: '已置顶' },
        { id: 0, name: '未置顶' }
      ],
      // 显示/隐藏
      accordingTo: [
        { id: '', name: '全部' },
        { id: 1, name: '显示' },
        { id: 0, name: '隐藏' }
      ],
      // 推荐/不推荐
      recommendTo: [
        { id: '', name: '全部' },
        { id: 1, name: '推荐' },
        { id: 0, name: '不推荐' }
      ],
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
  watch: {},
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
    courseListData() {
      const data = {
        id: this.searchData.id,
        name: this.searchData.name,
        teacher_name: this.searchData.teacher_name,
        is_show: this.searchData.is_show,
        is_recommend: this.searchData.is_recommend,
        page_size: this.page.pageSize,
        page: this.page.currentPage
      }
      courseList(data).then(res => {
        if (res.data && res.code === 200) {
          this.tableData = res.data
          this.page.total_page = parseInt(res.total)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑排序
    editArtistSortData(_id, _sort) {
      const formData = new FormData()
      formData.append('id', _id)
      formData.append('sort', _sort)
      editArtistSort(formData).then(res => {
        if (res.data && res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.refreshTable()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeTableSort(val) {
      const id = val.id
      const value = val.sort
      this.editArtistSortData(id, value)
    },
    // 修改是否显示状态
    editArtistShowData(_artist_id, _is_show) {
      const formData = new FormData()
      formData.append('id', _artist_id)
      formData.append('is_show', _is_show)
      editArtistShow(formData).then(res => {
        if (res.data && res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.drawTable()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeTableShow(val) {
      const id = val.id
      const value = val.is_show
      this.editArtistShowData(id, value)
    },
    // 修改课程置顶状态
    editArtistStickData(_artist_id, _stick) {
      const formData = new FormData()
      formData.append('id', _artist_id)
      formData.append('stick', _stick)
      editArtistStick(formData).then(res => {
        if (res.data && res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.drawTable()
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeTableStick(val) {
      const id = val.id
      const value = val.stick
      this.editArtistStickData(id, value)
    },
    // 修改状态
    editArtistStatusData(_artist_id, _status) {
      const formData = new FormData()
      formData.append('id', _artist_id)
      formData.append('status', _status)
      editArtistStatus(formData).then(res => {
        if (res.data && res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.drawTable()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeTableStatus(val) {
      const id = val.id
      const value = val.status
      this.editArtistStatusData(id, value)
    },
    // 添加
    openAdd(_type, _id) {
      this.$router.push({
        name: 'add-course-management',
        query: { id: _id, type: _type }
      })
    },
    // 编辑
    openEdit(_type, _row) {
      if (_type === 1) {
        this.$router.push({
          name: 'edit-course-management',
          query: { id: _row.id, type: _type }
        })
      } else if (_type === 2) {
        this.$router.push({
          name: 'course-management-detail',
          query: { id: _row.id, type: _type, status: _row.status }
        })
      } else if (_type === 3) {
        this.$router.push({
          name: 'chapter-management',
          query: { course_id: _row.id, type: _type }
        })
      } else {
        console.log('Nothing happen')
      }
    },
    // 渲染表格
    drawTable() {
      this.courseListData()
    },
    // 刷新表格
    refreshTable() {
      this.page.currentPage = 1
      this.drawTable()
    },
    // 分页
    handleSizeChange(val) {
      this.page.pageSize = val
      this.drawTable()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.drawTable()
    },
    // 重置
    resetSearch() {
      //   this.searchData.status = '' // 顶部Tab切换：上架出售->4；下架->1；暂不出售->5
      this.searchData.id = '' // 课程id
      this.searchData.name = '' // 课程名
      this.searchData.teacher_name = '' // 讲师名称
      this.searchData.is_recommend = '' // 推荐/不推荐
      this.searchData.is_show = '' // 显示/隐藏
      this.refreshTable()
    }
  }
}
</script>

<style lang="scss">
.course-management_container {
    .course-management_card {
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
.course-management_container {
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
    width: 41%;
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
  .course-management_header {
    // padding-top: 20px;
  }
  .course-management_header_list {
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
