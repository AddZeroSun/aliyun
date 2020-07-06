<template>
  <div class="chapter_management_container">
    <el-card class="chapter_management_card">
      <div slot="header" class="chapter_management_header">
        <el-row>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:40px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="22" :sm="22" :md="4" :lg="2" :xl="2">
            <div class="chapter_management_header_list">
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
              <span class="pub_input_title">章节名称</span>
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
              <span class="pub_input_title">是否收费</span>
              <el-select v-model="searchData.status" class="pub_input_input" placeholder="请选择是否推荐">
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
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
          <el-tab-pane label="全部章节" name="0">
            <chapter-management-table :datalist="tableData" :statuslist="statusList" @change-sort="changeTableSort" @open-editor="openEdit"></chapter-management-table>
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
import mixin from '@/utils/mixin'
import { chapterList, editChapterSort } from '@/api/courseManagement.js'
import ChapterManagementTable from './components/ChapterManagementTable'
export default {
  name: 'ChapterManagement', // 章节管理
  components: {
    ChapterManagementTable
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      showType: '0',
      course_id: '',
      // 搜索内容
      searchData: {
        status: '', // 是否收费
        course_id: '', // 课程id
        name: '', // 课程名
        is_show: '' // 显示/隐藏
      },
      statusList: [
        { id: '', name: '全部' },
        { id: 1, name: '免费' },
        { id: 2, name: '收费' }
      ],
      // 显示/隐藏
      accordingTo: [
        { id: '', name: '全部' },
        { id: 1, name: '显示' },
        { id: 0, name: '隐藏' }
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
    this.course_id = this.$route.query.course_id
    // 获取列表
    this.keyupSubmit()
    this.drawTable()
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'course-management',
        query: {}
      })
    },
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
    chapterListData() {
      const data = {
        course_id: this.course_id,
        name: this.searchData.name,
        is_show: this.searchData.is_show,
        status: this.searchData.status,
        page_size: this.page.pageSize,
        page: this.page.currentPage
      }
      chapterList(data).then(res => {
        if (res.data && res.code === 200) {
          this.tableData = res.data
          this.page.total_page = parseInt(res.total)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑排序
    editChapterSortData(_id, _sort) {
      const formData = new FormData()
      formData.append('id', _id)
      formData.append('sort', _sort)
      editChapterSort(formData).then(res => {
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
      this.editChapterSortData(id, value)
    },
    // 添加
    openAdd(_type, _id) {
      this.$router.push({
        name: 'add-chapter-management',
        query: { course_id: this.course_id, type: _type }
      })
    },
    // 编辑/详情
    openEdit(_type, _row) {
      if (_type === 1) {
        this.$router.push({
          name: 'edit-chapter-management',
          query: { id: _row.id, course_id: this.course_id, type: _type }
        })
      } else if (_type === 2) {
        this.$router.push({
          name: 'chapter-management-detail',
          query: { id: _row.id, type: _type }
        })
      }
    },
    // 渲染表格
    drawTable() {
      this.chapterListData()
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
      this.searchData.status = '' // 是否收费
      this.searchData.name = '' // 课程名
      this.searchData.is_show = '' // 显示/隐藏
      this.refreshTable()
    }
  }
}
</script>

<style lang="scss">
.chapter_management_container {
    .chapter_management_card {
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
.chapter_management_container {
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
  .chapter_management_header {
    // padding-top: 20px;
  }
  .add_edit_theme_manager_header_list {
    // line-height: 40px;
  }
  .chapter_management_header_list {
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
