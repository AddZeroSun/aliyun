<template>
  <div class="course_management_detail_container">
    <el-card class="course_management_detail_card">
      <div slot="header" class="course_management_detail_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="course_management_detail_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 课程 -->
        <div class="work_content">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
              <el-form ref="courseCon" :model="dataList" label-width="100px" class="demo-dataList">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="课程ID：">
                      <div>{{ id }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="课程名称：">
                      <div>{{ dataList.name }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="讲师：">
                      <div>{{ dataList.teacher_name }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="讲师ID：">
                      <div>{{ dataList.teacher_id }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="联系方式：">
                      <div>{{ dataList.teacher_phone }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="上架时间：">
                      <div>{{ dataList.add_time }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="价格：">
                      <div>{{ dataList.price }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="课程规格：">
                      <div>{{ dataList.course_spe }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                    <el-form-item label="章节数：">
                      <div>{{ dataList.chapter_number }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                    <el-form-item label="学习人数：">
                      <div>{{ dataList.learn_num }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                    <el-form-item label="收藏数：">
                      <div>{{ dataList.collect_num }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="是否显示：">
                      <div>{{ dataList.is_show_text }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="是否显示：">
                      <div>{{ dataList.is_recommend_text }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="权重：">
                      <div>{{ dataList.sort }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                    <el-form-item label="封面图">
                      <div class="upload_con">
                        <div class="original_image" @click="imagecropperShow=true">
                          <img v-if="imageUrl_0" :src="imageUrl_0" class="original_image_avatar">
                          <i v-else class="el-icon-plus original_image_icon el-upload_dr"></i>
                          <div v-if="imageUrl_0" class="hover_con">
                            <p class="hover_con_list">
                              <!-- <i class="hover_con_msg el-icon-plus"></i> -->
                              <i
                                class="hover_con_msg el-icon-zoom-in"
                                @click.stop="openImageView(imageUrl_0)"
                              ></i>
                            </p>
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 图片放大 -->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" class="show_image" :src="viewImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="div_con"></div>
      <div v-if="statusCon !== 2" class="btn_con">
        <el-button class="sub_btn" type="primary" @click="openList">返回列表</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '@/utils/mixin'
import { courseDetail } from '@/api/courseManagement.js'
export default {
  name: 'CourseManagementDetail', // 详情
  components: {
  },
  mixins: [mixin],
  data() {
    return {
      type: 0,
      status: 0,
      statusCon: 0,
      // 添加还是详情页面
      typeCon: this.type,
      dataDetail: this.list,
      dataList: {
        add_time: '', // 上架时间
        chapter_number: '', // 章节数
        collect_num: '', // 收藏数
        course_spe: '', // 课程规格
        image: '', // 封面图
        is_recommend: '', // 推荐id
        is_recommend_text: '', // 推荐
        is_show: '', // 显示id
        is_show_text: '', // 显示
        learn_num: '', // 学习人数
        name: '', // 课程名称
        price: '', // 价格
        status: '', // 状态id
        status_text: '', // 状态
        teacher_id: '', // 讲师id
        teacher_name: '', // 讲师姓名
        teacher_phone: '', // 联系方式
        sort: '' // 权重
      },
      viewImageUrl: '',
      dialogVisible: false,
      // 封面图
      imageUrl_0_file: '',
      imageUrl_0: '',
      c_hd_width: '',
      c_hd_height: '',
      c_hd_size: '',
      proBar_0: false,
      setting_0_Data: {
        width: 1600,
        height: 1600,
        isCheckSize: false,
        isCheckImage: false,
        type: 0
      },
      // 主页图
      imageUrl_1_file: '',
      imageUrl_1: '',
      proBar_1: false,
      setting_1_Data: {
        width: 1600,
        height: 1600,
        isCheckSize: false,
        isCheckImage: false,
        type: 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
  },
  created() {
    this.id = this.$route.query.id
    this.status = parseInt(this.$route.query.status)
    this.statusCon = parseInt(this.$route.query.status)
    this.type = parseInt(this.$route.query.type)
    this.courseDetailData(this.id)
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    goBack() {
      this.back()
    },
    openImageView(_imgUrl) {
      this.viewImageUrl = _imgUrl
      this.dialogVisible = true
    },
    // 获取信息
    courseDetailData(_id) {
      const data = {
        id: _id
      }
      courseDetail(data).then(res => {
        if (res.data && res.code === 200) {
          this.dataList = res.data
          this.imageUrl_0 = res.data.image
        }
      }).catch(err => {
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
.course_management_detail_container {
  .el-dialog__body {
    // 放大图片居中
    text-align: center;
  }
  .course_management_detail_card {
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
  .upload_con {
    width: 150px;
  }
  // 预览上传
  .hover_con {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(0,0,0,0.5);
    font-size: 20px;
    // opacity: 0.5;
  }
  .hover_con_msg {
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
  }
  .hover_con_msg:hover {
    cursor: pointer;
  }
  .original_image:hover {
    .hover_con {
      display: block;
    }
  }
  .hover_con_list {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    // left: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
}
</style>
<style lang="scss" scoped>
.course_management_detail_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .course_management_detail_header {
    // padding-top: 20px;
  }
  .course_management_detail_header_list {
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
    // 原图
  .original_image {
    height: 150px;
    position: relative;
  }
  .original_image .el-upload {
    width: 150px;
    height: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .original_image .el-upload:hover {
    border-color: #409EFF;
  }
  .original_image_icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .original_image_avatar {
    // width: 150px;
    // height: 150px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .el-upload-dragger{
    background-color: none;
    border: 0px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .el-upload_dr {
    width: 150px;
    height: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .show_image {
    max-width: 500px;
    object-fit: contain;
  }
}
</style>
