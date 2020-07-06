<template>
  <div class="add_carousel_container">
    <el-card class="add_carousel_card">
      <div slot="header" class="add_carousel_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="add_carousel_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 艺术家 -->
        <div class="work_content">
          <carousel-con ref="carouselCon" :type="type" :list="carousel_data_list"></carousel-con>
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
import { addBanner, editBanner, bannerDetail } from '@/api/systemManagement.js'
import CarouselCon from './components/CarouselCon.vue'
export default {
  name: 'AddEditCourse', // 添加编辑课程
  components: {
    CarouselCon
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      type: 0,
      // 轮播图信息
      dataList: {
        id: '', // 图片ID
        title: '', // 标题
        desc: '', // 描述
        top_img: '', // 轮播图
        callback: '', // 链接地址
        is_show: 1, // 是否显示 1显示 2隐藏 默认1
        sort: 0 // 权重 默认0
      },
      carousel_data_list: {}
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
      this.getCarouselInfoData(this.id)
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
    getCarouselInfoData(_id) {
      const data = {
        id: _id
      }
      bannerDetail(data).then(res => {
        if (res.data && res.code === 200) {
          this.carousel_data_list = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存（添加）
    async save() {
      const _this = this
      await _this.$refs.carouselCon.submitForm().then(res => {
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.id = res.data.id
          _this.dataList.top_img = res.data.top_img
          _this.dataList.title = res.data.title
          _this.dataList.desc = res.data.desc
          _this.dataList.callback_url = res.data.callback_url
          _this.dataList.sort = res.data.sort
          _this.dataList.is_show = res.data.is_show
        } else {
          _this.isCheck = false
        }
      }).catch(error => {
        console.log(error)
      })
      if (_this.isCheck) {
        if (this.type === 0) {
          this.addBannerData()
        }
      }
    },
    // 修改
    async saveEdit() {
      const _this = this
      await _this.$refs.carouselCon.submitForm().then(res => {
        // console.log('carouselCon', res)
        if (res.code === 200) {
          _this.isCheck = true
          _this.dataList.id = res.data.id
          _this.dataList.top_img = res.data.top_img
          _this.dataList.title = res.data.title
          _this.dataList.desc = res.data.desc
          _this.dataList.callback_url = res.data.callback_url
          _this.dataList.sort = res.data.sort
          _this.dataList.is_show = res.data.is_show
        } else {
          this.isCheck = false
        }
        if (_this.isCheck) {
          if (this.type === 1) {
            this.editCarouselData()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加
    addBannerData() {
      if (this.dataList.top_img === '') {
        this.$message({
          message: '请上传轮播图',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        image: this.dataList.top_img,
        title: this.dataList.title,
        desc: this.dataList.desc,
        callback_url: this.dataList.callback_url,
        sort: this.dataList.sort,
        is_show: this.dataList.is_show
      }
      addBanner(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'system-management',
            query: { showType: '0' }
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
    editCarouselData() {
      if (this.dataList.top_img === '') {
        this.$message({
          message: '请上传轮播图',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        id: this.id,
        image: this.dataList.top_img,
        title: this.dataList.title,
        desc: this.dataList.desc,
        callback_url: this.dataList.callback_url,
        sort: this.dataList.sort,
        is_show: this.dataList.is_show
      }
      editBanner(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'system-management',
            query: { showType: '0' }
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
        name: 'system-management',
        query: { showType: '0' }
      })
    }
  }
}
</script>

<style lang="scss">
.add_carousel_container {
  .add_carousel_card {
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
.add_carousel_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .add_carousel_header {
    // padding-top: 20px;
  }
  .add_carousel_header_list {
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
