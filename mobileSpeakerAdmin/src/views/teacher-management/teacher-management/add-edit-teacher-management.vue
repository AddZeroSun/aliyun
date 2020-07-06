<template>
  <div class="add_edit_teacher_management_container">
    <el-card class="add_edit_teacher_management_card">
      <div slot="header" class="add_edit_teacher_management_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="add_edit_teacher_management_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 艺术家 -->
        <div class="work_content">
          <teacher-con ref="teacherCon" :type="type" :list="teacher_data_list"></teacher-con>
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
import { createTeacher, teacherDetail, editTeacher } from '@/api/teacherManagement.js'
import TeacherCon from './components/TeacherCon.vue'
export default {
  name: 'AddEditTeacherManagement', // 添加编辑名师
  components: {
    TeacherCon
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      //   id: '',
      type: 0,
      // 作品信息
      dataList: {
        artist_id: '',
        phone: '', // 手机号码
        type: '', // 用户类型
        nick_name: '', // 昵称
        name: '', // 姓名
        password: '', // 密码
        sex: '', // 性别1男  2女  0未知
        artist_type: [], // 艺术家风格
        honor: '', // 头衔
        university: '', // 毕业院校
        head: '', // 头像
        top_img: '', // 详情顶部图
        info: '', // 艺术家简介
        sort: 0 // 权重 默认为0
      },
      teacher_data_list: {}
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
      this.getTeacherInfoData(this.id)
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
    getTeacherInfoData(_id) {
      const data = {
        id: _id
      }
      teacherDetail(data).then(res => {
        // const _this = this
        // console.log(res)
        if (res.data && res.code === 200) {
          this.teacher_data_list = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存
    async save() {
      const _this = this
      // 名师
      await _this.$refs.teacherCon.submitForm().then(res => {
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.phone = res.data.phone
          _this.dataList.type = res.data.type
          //   _this.dataList.nick_name = res.data.nick_name
          _this.dataList.sex = res.data.sex
          _this.dataList.head = _this.$refs.teacherCon.imageUrl_0
          _this.dataList.top_img = _this.$refs.teacherCon.imageUrl_1
          _this.dataList.name = res.data.name
          //   _this.dataList.password = res.data.password
          //   _this.dataList.artist_type = res.data.artist_type
          //   _this.dataList.honor = res.data.honor
          //   _this.dataList.university = res.data.university
          _this.dataList.info = res.data.info
          _this.dataList.is_show = res.data.is_show
          _this.dataList.is_recommend = res.data.is_recommend
          _this.dataList.sort = res.data.sort
        } else {
          _this.isCheck = false
        }
      }).catch(error => {
        console.log(error)
      })
      if (_this.isCheck) {
        if (this.type === 0) {
          this.createTeacherData()
        }
      }
    },
    // 修改
    async saveEdit() {
      const _this = this
      // 作品
      await _this.$refs.teacherCon.submitForm().then(res => {
        // console.log('workCon', res)
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.artist_id = res.data.artist_id
          _this.dataList.phone = res.data.phone
          _this.dataList.type = res.data.type
          //   _this.dataList.nick_name = res.data.nick_name
          _this.dataList.sex = res.data.sex
          _this.dataList.head = _this.$refs.teacherCon.imageUrl_0
          _this.dataList.top_img = _this.$refs.teacherCon.imageUrl_1
          _this.dataList.name = res.data.name
          //   _this.dataList.password = res.data.password
          //   _this.dataList.artist_type = res.data.artist_type
          //   _this.dataList.honor = res.data.honor
          //   _this.dataList.university = res.data.university
          _this.dataList.info = res.data.info
          _this.dataList.is_show = res.data.is_show
          _this.dataList.is_recommend = res.data.is_recommend
          _this.dataList.sort = res.data.sort
        } else {
          this.isCheck = false
        }
        if (_this.isCheck) {
          if (this.type === 1) {
            this.editTeacherData()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加
    createTeacherData() {
      if (this.dataList.head === '') {
        this.$message({
          message: '请上传讲师头像',
          type: 'warning'
        })
        return false
      }
      //   if (this.dataList.top_img === '') {
      //     this.$message({
      //       message: '请上传艺术家主页顶图',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      this.loading = true
      const jsonData = {
        phone: this.dataList.phone,
        sex: this.dataList.sex,
        head: this.dataList.head,
        // head: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: this.dataList.name,
        info: this.dataList.info,
        is_show: this.dataList.is_show,
        is_recommend: this.dataList.is_recommend,
        sort: this.dataList.sort
      }
      createTeacher(jsonData).then(res => {
        if (res.data && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'teacher-management',
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
    editTeacherData() {
      if (this.dataList.head === '') {
        this.$message({
          message: '请上传讲师头像',
          type: 'warning'
        })
        return false
      }
      //   if (this.dataList.top_img === '') {
      //     this.$message({
      //       message: '主页顶图',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      this.loading = true
      const jsonData = {
        id: this.id,
        phone: this.dataList.phone,
        sex: this.dataList.sex,
        head: this.dataList.head,
        // head: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: this.dataList.name,
        info: this.dataList.info,
        is_show: this.dataList.is_show,
        is_recommend: this.dataList.is_recommend,
        sort: this.dataList.sort
      }
      editTeacher(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'teacher-management',
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
        name: 'teacher-management',
        query: {}
      })
    }
  }
}
</script>

<style lang="scss">
.add_edit_teacher_management_container {
  .add_edit_teacher_management_card {
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
.add_edit_teacher_management_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .add_edit_teacher_management_header {
    // padding-top: 20px;
  }
  .add_edit_teacher_management_header_list {
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
