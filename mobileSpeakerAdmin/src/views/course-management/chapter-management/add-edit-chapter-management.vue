<template>
  <div class="add_edit_chapter_container">
    <el-card class="add_editor_chapter_card">
      <div slot="header" class="add_editor_chapter_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_chapter_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="add_editor_chapter_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 章节 -->
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <el-form ref="chapterCon" :model="dataList" :rules="rules" label-width="100px" class="demo-dataList">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                  <el-form-item label="视频" prop="url">
                    <el-upload
                      ref="videoUpload"
                      class="upload-demo"
                      :action="basicUrl +'/upload-video/'"
                      :before-upload="beforeUpload"
                      :on-remove="handleRemoveAddVideo"
                      :on-success="handleSuccessAddVideo"
                      :show-file-list="true"
                      :limit="1"
                      accept=".mp4"
                    >
                      <el-button size="small" type="primary" @click="uploadReset">点击上传</el-button>
                    </el-upload>
                    <div><p class="msg">仅支持 mp4 格式，文件小于1GB。</p></div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <el-form-item label="">
                    <video :src="dataList.url" controls style="width: 100%;"></video>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item label="章节数" prop="num">
                    <el-input v-model="dataList.num" :maxlength="20" placeholder="请输入章节数"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item label="章节名称" prop="name">
                    <el-input v-model="dataList.name" :maxlength="11" placeholder="请输入章节名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item label="是否显示" prop="is_show">
                    <el-radio-group v-model="dataList.is_show">
                      <el-radio :label="1">显示</el-radio>
                      <el-radio :label="2">隐藏</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item label="是否收费" prop="status">
                    <el-radio-group v-model="dataList.status">
                      <el-radio :label="1">免费</el-radio>
                      <el-radio :label="2">收费</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
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
import mixin from '@/utils/mixin'
import { createChapter, editChapter, chapterDetail } from '@/api/courseManagement.js'
export default {
  name: 'ChapterCon',
  components: {},
  mixins: [mixin],
  data() {
    return {
      basicUrl: process.env.VUE_APP_BASE_API,
      loading: false,
      isUpload: false,
      // 添加还是详情页面
      type: 0,
      dataList: {
        num: '', // 章节数
        name: '', // 章节名称
        course_id: '', // 课程id
        is_show: '', // 课程id
        status: '', // 课程id
        url: '' // 视频地址
      },
      fileList: [],
      rules: {
        url: [
          { required: true, message: '请上传视频', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入章节数', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入章节名称', trigger: 'change' },
          { min: 0, max: 20, message: '昵称在 1 到 20 个字符', trigger: 'blur' }
        ],
        is_show: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.type = parseInt(this.$route.query.type)
    this.dataList.course_id = this.$route.query.course_id
    if (this.type === 1) {
      this.dataList.id = this.$route.query.id
      this.getChapterDetail()
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
    // 获取章节详情
    getChapterDetail() {
      const jsonData = {
        id: this.dataList.id
      }
      chapterDetail(jsonData).then(res => {
        if (res.data && res.code === 200) {
          this.dataList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    uploadReset() {
      this.$refs.videoUpload.clearFiles()
    },
    beforeUpload(file) {
      const isLarge = file.size / 1024 / 1024 / 1024 < 1
      if (!isLarge) {
        this.$message.error('上传文件大小不能超过 1GB!')
      }
      return isLarge
    },
    handleRemoveAddVideo(file, fileList) {
      this.dataList.url = ''
    },
    handleSuccessAddVideo(file, fileList) {
      // console.log(file)
      if (file.url) {
        this.$message.success('视频上传成功')
        this.dataList.url = file.url
      } else {
        this.$message.error('未知错误')
      }
    },
    // 保存（添加）
    save() {
      this.addChapterData()
    },
    // 修改
    async saveEdit() {
      this.editChapterData()
    },
    // 添加
    addChapterData() {
      if (this.dataList.url === '') {
        this.$message({
          message: '请上传视频',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        course_id: this.dataList.course_id,
        name: this.dataList.name,
        num: this.dataList.num,
        url: this.dataList.url,
        status: this.dataList.status,
        is_show: this.dataList.is_show
      }
      createChapter(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'chapter-management',
            query: { showType: '0', course_id: this.dataList.course_id }
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
    editChapterData() {
      if (this.dataList.url === '') {
        this.$message({
          message: '请上传视频',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        id: this.dataList.id,
        course_id: this.dataList.course_id,
        name: this.dataList.name,
        num: this.dataList.num,
        url: this.dataList.url,
        status: this.dataList.status,
        is_show: this.dataList.is_show
      }
      editChapter(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'chapter-management',
            query: { showType: '0', course_id: this.dataList.course_id }
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
    // 返回列表
    openList() {
      this.$router.push({
        name: 'chapter-management',
        query: { showType: '0', course_id: this.dataList.course_id }
      })
    },
    resetForm() {
      this.$refs.workCon.resetFields()
    }
  }
}
</script>

<style lang="scss">
.add_edit_chapter_container {
  .add_editor_chapter_card {
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
  .el-upload-list {
    width: 300px;
  }
   // 作品图
  // 原图
  .original_image {
    height: 150px;
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
}
</style>
<style lang="scss" scoped>
.add_edit_chapter_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .add_editor_chapter_header {
    // padding-top: 20px;
  }
  .add_editor_chapter_header_list {
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
    .msg{
    line-height: 10px;
    color: #999999;
  }
  // 边距
  .img_list_top {
    padding-top: 20px;
  }
  .msg{
    color: #999999;
    line-height: 18px;
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
  .original_image:hover{
    position: relative;
    .hover_con {
      display: block;
    }
  }
  .original_image .el-upload--text:hover{
    .hover_con {
      display: block;
    }
  }
   // 作品图
  // 原图
  .upload_con {
    width: 150px;
  }
  .upload_title {
    text-align: center;
    line-height: 20px;
  }
  .upload_title_t {
    padding-top: 10px;
  }
  .Works_figure_content {
    padding-top: 20px;
  }
  // 高清
  .upload_hd_con {
    // padding-top: 30px;
    width: 120PX;
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
  // 1:1原图
}
</style>
