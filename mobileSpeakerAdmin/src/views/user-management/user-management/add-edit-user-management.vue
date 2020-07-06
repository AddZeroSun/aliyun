<template>
  <div class="add_editor_work_library_container">
    <el-card class="add_editor_work_library_card">
      <div slot="header" class="add_editor_work_library_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="add_editor_work_library_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 艺术家 -->
        <div class="work_content">
          <user-con ref="artistCon" :type="type" :list="artist_data_list"></user-con>
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
import { addArtist, editArtist, getArtistInfo } from '@/api/artistManagement.js'
import UserCon from './components/UserCon.vue'
export default {
  name: 'AddEditWorkLibrary', // 作品置顶推荐
  components: {
    UserCon
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      type: 0,
      // 作品信息
      dataList: {
        artist_id: '',
        phone: '', // 手机号码
        type: '', // 用户类型
        nick_name: '', // 昵称
        real_name: '', // 姓名
        password: '', // 密码
        sex: '', // 性别1男  2女  0未知
        artist_type: [], // 艺术家风格
        honor: '', // 头衔
        university: '', // 毕业院校
        header_url: '', // 头像
        top_img: '', // 详情顶部图
        info: '' // 艺术家简介
      },
      artist_data_list: {}
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
      this.getArtistInfoData(this.id)
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
    getArtistInfoData(_id) {
      const data = {
        artist_id: _id
      }
      getArtistInfo(data).then(res => {
        // const _this = this
        // console.log(res)
        if (res.data && res.status === 200) {
          this.artist_data_list = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存
    async save() {
      const _this = this
      // 艺术家
      await _this.$refs.artistCon.submitForm().then(res => {
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.phone = res.data.phone
          _this.dataList.type = res.data.type
          _this.dataList.nick_name = res.data.nick_name
          _this.dataList.sex = res.data.sex
          _this.dataList.header_url = _this.$refs.artistCon.imageUrl_0
          _this.dataList.top_img = _this.$refs.artistCon.imageUrl_1
          _this.dataList.real_name = res.data.real_name
          _this.dataList.password = res.data.password
          _this.dataList.artist_type = res.data.artist_type
          _this.dataList.honor = res.data.honor
          _this.dataList.university = res.data.university
          _this.dataList.info = res.data.info
        } else {
          _this.isCheck = false
        }
      }).catch(error => {
        console.log(error)
      })
      if (_this.isCheck) {
        if (this.type === 0) {
          this.addArtistData()
        }
      }
    },
    // 修改
    async saveEdit() {
      const _this = this
      // 作品
      await _this.$refs.artistCon.submitForm().then(res => {
        // console.log('workCon', res)
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.artist_id = res.data.artist_id
          _this.dataList.phone = res.data.phone
          _this.dataList.type = res.data.type
          _this.dataList.nick_name = res.data.nick_name
          _this.dataList.sex = res.data.sex
          _this.dataList.header_url = _this.$refs.artistCon.imageUrl_0
          _this.dataList.top_img = _this.$refs.artistCon.imageUrl_1
          _this.dataList.real_name = res.data.real_name
          _this.dataList.password = res.data.password
          _this.dataList.artist_type = res.data.artist_type
          _this.dataList.honor = res.data.honor
          _this.dataList.university = res.data.university
          _this.dataList.info = res.data.info
        } else {
          this.isCheck = false
        }
        if (_this.isCheck) {
          if (this.type === 1) {
            this.editArtistData()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加
    addArtistData() {
      if (this.dataList.header_url === '') {
        this.$message({
          message: '请上传艺术家头像',
          type: 'warning'
        })
        return false
      }
      if (this.dataList.top_img === '') {
        this.$message({
          message: '请上传艺术家主页顶图',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const formData = new FormData()
      formData.append('phone', this.dataList.phone)
      formData.append('type', this.dataList.type)
      formData.append('nick_name', this.dataList.nick_name)
      formData.append('sex', this.dataList.sex)
      formData.append('header_url', this.dataList.header_url)
      formData.append('top_img', this.dataList.top_img)
      formData.append('real_name', this.dataList.real_name)
      formData.append('password', this.dataList.password)
      formData.append('artist_type', JSON.stringify(this.dataList.artist_type))
      formData.append('honor', this.dataList.honor)
      formData.append('university', this.dataList.university)
      formData.append('info', this.dataList.info)
      addArtist(formData).then(res => {
        if (res.data && res.status === 200) {
          // console.log(res)
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'artist-management',
            query: {}
          })
        } else {
          this.loading = false
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 修改
    editArtistData() {
      if (this.dataList.header_url === '') {
        this.$message({
          message: '请上传头像',
          type: 'warning'
        })
        return false
      }
      if (this.dataList.top_img === '') {
        this.$message({
          message: '主页顶图',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const formData = new FormData()
      formData.append('artist_id', this.dataList.artist_id)
      formData.append('phone', this.dataList.phone)
      formData.append('type', this.dataList.type)
      formData.append('nick_name', this.dataList.nick_name)
      formData.append('sex', this.dataList.sex)
      formData.append('header_url', this.dataList.header_url)
      formData.append('top_img', this.dataList.top_img)
      formData.append('real_name', this.dataList.real_name)
      formData.append('password', this.dataList.password)
      formData.append('artist_type', JSON.stringify(this.dataList.artist_type))
      formData.append('honor', this.dataList.honor)
      formData.append('university', this.dataList.university)
      formData.append('info', this.dataList.info)
      editArtist(formData).then(res => {
        if (res.data && res.status === 200) {
          // console.log(res)
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'artist-management',
            query: {}
          })
        } else {
          this.loading = false
          this.$message({
            message: res.message,
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
        name: 'artist-management',
        query: {}
      })
    }
  }
}
</script>

<style lang="scss">
.add_editor_work_library_container {
  .add_editor_work_library_card {
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
.add_editor_work_library_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .add_editor_work_library_header {
    // padding-top: 20px;
  }
  .add_editor_work_library_header_list {
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
