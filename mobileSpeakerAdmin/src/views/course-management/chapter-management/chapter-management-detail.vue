<template>
  <div class="chapter_management_detail_container">
    <el-card class="chapter_management_detail_card">
      <div slot="header" class="chapter_management_detail_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="chapter_management_detail_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 章节 -->
        <div class="work_content">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
              <el-form ref="courseCon" :model="dataList" label-width="100px" class="demo-dataList">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-form-item label="章节视频：">
                      <video :src="dataList.url" controls style="width: 100%;"></video>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="章节ID：">
                      <div>{{ dataList.id }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="章节名称：">
                      <div>{{ dataList.name }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="章节数：">
                      <div>{{ dataList.num }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="所属课程：">
                      <div>{{ dataList.course_name }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="课程ID：">
                      <div>{{ dataList.course_id }}</div>
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
                    <el-form-item label="是否收费：">
                      <div>{{ dataList.status_text }}</div>
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
              </el-form>
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
import { chapterDetail } from '@/api/courseManagement.js'
export default {
  name: 'ChapterManagementDetail', // 详情
  components: {
  },
  mixins: [mixin],
  data() {
    return {
      type: 0,
      statusCon: 0,
      // 添加还是详情页面
      typeCon: this.type,
      dataList: {
        url: '', // 视频地址
        add_time: '', // 上架时间
        num: '', // 章节数
        id: '', // 章节id
        name: '', // 章节名称
        course_id: '', // 课程id
        course_name: '', // 课程名称
        is_show: '', // 显示id
        is_show_text: '', // 显示/隐藏
        status: '', // 收费id
        status_text: '' // 收费/免费
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
    // 获取信息
    courseDetailData(_id) {
      const data = {
        id: _id
      }
      chapterDetail(data).then(res => {
        if (res.data && res.code === 200) {
          this.dataList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    openList() {
      this.$router.push({
        name: 'chapter-management',
        query: { showType: '0', course_id: this.dataList.course_id }
      })
    }
  }
}
</script>

<style lang="scss">
.chapter_management_detail_container {
  .el-dialog__body {
    // 放大图片居中
    text-align: center;
  }
  .chapter_management_detail_card {
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
.chapter_management_detail_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .chapter_management_detail_header {
    // padding-top: 20px;
  }
  .chapter_management_detail_header_list {
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
