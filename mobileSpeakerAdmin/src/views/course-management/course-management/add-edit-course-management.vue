<template>
  <div class="add_course_container">
    <el-card class="add_course_card">
      <div slot="header" class="add_course_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="add_course_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 艺术家 -->
        <div class="work_content">
          <course-con ref="courseCon" :type="type" :courseid="id" :list="course_data_list"></course-con>
        </div>
      </div>
      <div class="div_con"></div>
      <div class="btn_con">
        <el-button class="sub_btn" type="primary" @click="openList">返回列表</el-button>
        <el-button v-if="type === 0" class="sub_btn" type="primary" :loading="loading" @click="save">完成</el-button>
        <el-button v-if="type === 1" class="sub_btn" type="primary" :loading="loading" @click="saveEdit">完成</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '@/utils/mixin'
import { createCourse, editCourse, courseDetail } from '@/api/courseManagement.js'
import CourseCon from './components/CourseCon.vue'
export default {
  name: 'AddEditCourse', // 添加编辑课程
  components: {
    CourseCon
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      type: 0,
      id: '',
      // 作品信息
      dataList: {
        course_id: '', // 课程id
        top_img: '', // 课程封面图
        course_name: '', // 课程名称
        teacher_name: '', // 讲师名称
        course_spe: '', // 课程规格
        chapter_number: '', // 章节数
        price: '', // 价格
        learn_num: '', // 学习人数
        collect_num: '', // 收藏数
        is_recommend: '', // 是否推荐
        is_show: '', // 是否显示
        sort: 0 // 权重 默认0
      },
      course_data_list: {}
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
    this.id = this.$route.query.id
    this.type = parseInt(this.$route.query.type)
    if (this.type === 1) {
      this.getCourseInfoData(this.id)
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    goBack() {
      this.back()
    },
    // 获取信息
    getCourseInfoData(_id) {
      const data = {
        id: _id
      }
      courseDetail(data).then(res => {
        // const _this = this
        // console.log(res)
        if (res.data && res.code === 200) {
          this.course_data_list = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存
    async save() {
      const _this = this
      // 课程
      await _this.$refs.courseCon.submitForm().then(res => {
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.top_img = res.data.top_img
          _this.dataList.course_name = res.data.course_name
          _this.dataList.teacher_id = res.data.teacher_id
          _this.dataList.teacher_name = res.data.teacher_name
          _this.dataList.course_spe = res.data.course_spe
          _this.dataList.chapter_number = res.data.chapter_number
          _this.dataList.price = res.data.price
          _this.dataList.learn_num = res.data.learn_num
          _this.dataList.collect_num = res.data.collect_num
          _this.dataList.is_show = res.data.is_show
          _this.dataList.is_recommend = res.data.is_recommend
          _this.dataList.sort = res.data.sort
          //   _this.dataList.header_url = _this.$refs.courseCon.imageUrl_0
          //   _this.dataList.top_img = _this.$refs.courseCon.imageUrl_1
        } else {
          _this.isCheck = false
        }
      }).catch(error => {
        console.log(error)
      })
      if (_this.isCheck) {
        if (this.type === 0) {
          this.createCourseData()
        }
      }
    },
    // 修改
    async saveEdit() {
      const _this = this
      // 作品
      await _this.$refs.courseCon.submitForm().then(res => {
        // console.log('courseCon', res)
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.teacher_id = res.data.teacher_id
          _this.dataList.teacher_name = res.data.teacher_name
          _this.dataList.chapter_number = res.data.chapter_number
          _this.dataList.collect_num = res.data.collect_num
          _this.dataList.course_name = res.data.course_name
          _this.dataList.course_spe = res.data.course_spe
          _this.dataList.is_recommend = res.data.is_recommend
          _this.dataList.is_show = res.data.is_show
          _this.dataList.learn_num = res.data.learn_num
          _this.dataList.price = res.data.price
          _this.dataList.top_img = res.data.top_img
          _this.dataList.sort = res.data.sort
        //   _this.dataList.top_img = _this.$refs.courseCon.image
        } else {
          this.isCheck = false
        }
        if (_this.isCheck) {
          if (this.type === 1) {
            this.editCourseData()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加
    createCourseData() {
      if (this.dataList.top_img === '') {
        this.$message({
          message: '请上传课程封面图',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        image: this.dataList.top_img,
        name: this.dataList.course_name,
        teacher_id: this.dataList.teacher_id,
        course_spe: this.dataList.course_spe,
        chapter_number: this.dataList.chapter_number,
        price: this.dataList.price,
        learn_num: this.dataList.learn_num,
        collect_num: this.dataList.collect_num,
        is_show: this.dataList.is_show,
        is_recommend: this.dataList.is_recommend,
        sort: this.dataList.sort
      }
      createCourse(jsonData).then(res => {
        if (res.data && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'course-management',
            query: {}
          })
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 修改
    editCourseData() {
      if (this.dataList.top_img === '') {
        this.$message({
          message: '请上传课程封面图',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        id: this.id,
        image: this.dataList.top_img,
        name: this.dataList.course_name,
        teacher_id: this.dataList.teacher_id,
        course_spe: this.dataList.course_spe,
        chapter_number: this.dataList.chapter_number,
        price: this.dataList.price,
        learn_num: this.dataList.learn_num,
        collect_num: this.dataList.collect_num,
        is_show: this.dataList.is_show,
        is_recommend: this.dataList.is_recommend,
        sort: this.dataList.sort
      }
      editCourse(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'course-management',
            query: {}
          })
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    openList() {
      this.$router.push({
        name: 'course-management',
        query: {}
      })
    }
  }
}
</script>

<style lang="scss">
.add_course_container {
  .add_course_card {
    .el-card__header {
      padding: 8px 10px;
    }
    .el-card__body {
      padding-left: 0px;
      padding-right: 0px;
    }
    .add_btn {
      float: right;
    }
    .pagination_body {
      padding-top: 20px;
      text-align: right;
    }
  }
}
</style>
<style lang="scss" scoped>
.add_course_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .add_course_header {
    // padding-top: 20px;
  }
  .add_course_header_list {
    height: 40px;
    line-height: 40px;
  }
  .header_list_title {
    padding-left: 15px;
  }
  // 标题样式
  .header_title {
    padding-right: 10px;
  }
  .title_con {
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .title_con_msg {
    font-size: 20px;
  }
  .nav_footer_con {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .work_content {
    border-bottom: 2px solid #F9F9F9;
  }
  .show_figure {
    padding-bottom: 80px;
  }
  .div_con {
    height: 80px;
  }
  .btn_con {
    z-index: 111;
    padding-top: 20px;
    padding-bottom: 20px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: #ffffff;
    text-align: center;
  }
  .btn_left {
    text-align: right;
  }
  .sub_btn {
    // float: right;
    margin-left: 10px;
    margin-right: 10px;
  }
  .Works_figure_content {
    padding-top: 20px;
    border-bottom: 2px solid #F9F9F9;
  }
}
</style>
