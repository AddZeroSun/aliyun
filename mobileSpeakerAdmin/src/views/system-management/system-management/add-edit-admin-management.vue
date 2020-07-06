<template>
  <div class="add_edit_admin_container">
    <el-card class="add_editor_admin_card">
      <div slot="header" class="add_editor_admin_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_admin_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="add_editor_admin_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 管理员 -->
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <el-form ref="adminCon" :model="dataList" :rules="rules" label-width="100px" class="demo-dataList">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                  <el-form-item label="头像" prop="user_head">
                    <div class="upload_con">
                      <div class="original_image" @click="imagecropperShow=true">
                        <img v-if="imageUrl_0" :src="imageUrl_0" class="original_image_avatar">
                        <i v-else class="el-icon-plus original_image_icon el-upload_dr"></i>
                        <div v-if="imageUrl_0" class="hover_con">
                          <p class="hover_con_list">
                            <i class="hover_con_msg el-icon-plus"></i>
                            <i
                              class="hover_con_msg el-icon-zoom-in"
                              @click.stop="openImageView(imageUrl_0)"
                            ></i>
                          </p>
                        </div>
                      </div>
                      <progress-bar ref="proBar_0" :showprogress="proBar_0"></progress-bar>
                    </div>
                    <div>
                      <p class="msg">图片仅支持JPG、JPEG、PNG格式，文件小于200KB。建议：长宽1:1，尺寸小于500像素。</p>
                    </div>
                    <image-cropper
                      v-if="resImagecropperShow"
                      v-show="imagecropperShow"
                      ref="imageCropper"
                      :key="imagecropperKey"
                      :width="300"
                      :height="300"
                      url="https://httpbin.org/post"
                      lang-type="zh"
                      @close="close"
                      @crop-upload-success="cropSuccess"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="dataList.username" :maxlength="20" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item label="手机号" prop="phone">
                    <el-input v-model="dataList.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <el-form-item v-if="type === 0" label="设置密码" prop="password">
                    <el-input v-model="dataList.password" type="password" :maxlength="11" placeholder="请输入密码" show-password autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item v-else-if="type === 1" label="修改密码" prop="edit_password">
                    <el-input v-model="dataList.password" type="password" :maxlength="11" placeholder="请输入密码" show-password autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 图片放大 -->
            <el-dialog width="600px" :visible.sync="dialogVisible">
              <img width="100%" :src="viewImageUrl" alt="">
            </el-dialog>
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
import ProgressBar from '@/components/progress-bar'
import ImageCropper from '@/components/ImageCropper'
import mixin from '@/utils/mixin'
import { addAdmin, editAdmin, uploadAdminImage } from '@/api/systemManagement.js'
export default {
  name: 'TeacherCon',
  components: {
    ProgressBar,
    ImageCropper
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      // 添加还是详情页面
      type: 0,
      dataList: {
        id: '',
        phone: '', // 手机号码
        username: '', // 用户名
        password: '', // 密码
        user_head: '' // 头像
      },
      tableData: {},
      imagecropperShow: false,
      resImagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      viewImageUrl: '',
      dialogVisible: false,
      // 头像
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
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        user_head: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'change' },
          { min: 0, max: 20, message: '昵称在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'change' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/, message: '密码为4-16位（含16）英文数字组合' }
          // { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{4,16}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 4 - 16位，（判断的时候不区分大小写)' }
        ],
        edit_password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { required: false, message: '请输入密码', trigger: 'change' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/, message: '密码为4-16位（含16）英文数字组合' }
          // { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{4,16}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 4 - 16位，（判断的时候不区分大小写)' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    imagecropperShow(val) {
      if (val) {
        this.resImagecropperShow = true
        this.$nextTick(() => {
          this.resImagecropperShow = true
        })
      } else {
        this.resImagecropperShow = false
        this.$nextTick(() => {
          this.resImagecropperShow = true
        })
      }
      this.$nextTick(() => {
        this.resImagecropperShow = true
      })
    }
  },
  created() {
    this.type = parseInt(this.$route.query.type)
    if (this.type === 1) {
      this.dataList.id = this.$route.query.user_id
      this.dataList.username = this.$route.query.username
      this.dataList.phone = this.$route.query.phone
      this.dataList.user_head = this.$route.query.user_head
      this.imageUrl_0 = this.$route.query.user_head
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
    // 放大图片
    openImageView(_imgUrl) {
      this.viewImageUrl = _imgUrl
      this.dialogVisible = true
    },
    // 剪切图片
    cropSuccess(resData) {
      // console.log('resData', resData)
      const _this = this
      this.uploadAdminImageData(resData.file, function(res) {
        if (res && res.code === 200) {
          _this.$refs.imageCropper.uploadEnd()
          _this.imagecropperShow = false
          _this.imagecropperKey = _this.imagecropperKey + 1
          _this.imageUrl_0 = res.url
          _this.dataList.user_head = res.url
        } else {
          _this.imagecropperShow = false
        }
      })
      // this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    },
    // 图片类型和大小
    checkImage(file, _size, _isSize, callback) {
      const type_arr = ['image/jpeg', 'image/png', 'image/jpg']
      const type = file.type
      if (!type_arr.includes(type)) {
        this.$message.error('图片格式不正确,只支持jpg和png类型图片')
        callback(0)
        return false
      } else {
        if (_isSize) {
          const isLt2M = file.size / 1024 / 1024 < _size
          if (!isLt2M) {
            this.$message.error(`上传图片大小不能超过 ${_size}MB!`)
            callback(0)
            return false
          } else {
            const isM = file.size / 1024 / 1024
            if (isM > 1) {
              const data = {
                size: isM.toFixed(2) + 'M',
                code: 1
              }
              callback(data)
            } else {
              const isK = file.size / 1024
              const data = {
                size: isK.toFixed(2) + 'kb',
                code: 1
              }
              callback(data)
            }
          }
        } else {
          callback(1)
        }
      }
    },
    // 图片尺寸
    checkImageSize(file, _width, _height, _isCheck, callback) {
      const _this = this
      const width = _width
      const height = _height
      const _URL = window.URL || window.webkitURL
      const img = new Image()
      img.onload = function() {
        // const imgWidth = img.width
        // const imgHight = img.height
        const valid = img.width === width && img.height === height
        if (_isCheck) {
          if (valid) {
            callback(1)
          } else {
            _this.$message.error(`请上传${_width} * ${_height}的图片`)
            callback(0)
          }
        } else {
          callback(1)
        }
      }
      img.src = _URL.createObjectURL(file)
    },
    // 上传图片
    uploadAdminImageData(_file, callback) {
      // const _this = this
      const formData = new FormData()
      formData.append('file', _file)
      uploadAdminImage(formData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          callback(res)
          // console.log(this.newImgUrl)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
          callback(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    action(val) {
      // this.imgType = val
      return 'uplodResultsScore'
    },
    beforeUpload(file) {
      const promise = new Promise((resolve) => {
        this.$nextTick(function() {
          resolve(true)
        })
      })
      return promise // 通过返回一个promis对象解决
    },
    // 主页图
    uploadImg(param) {
      const _this = this
      const type = param.data.type
      this.checkImage(param.file, 100, param.data.isCheckSize, function(res) {
        if (res.code !== 0) {
          _this.checkImageSize(param.file, param.data.width, param.data.height, param.data.isCheckImage, function(resS) {
            if (resS === 1) {
              switch (true) {
                case type === 0:
                  _this.proBar_0 = true
                  _this.$refs.proBar_0.startProgressBar()
                  _this.imageUrl_0_file = param.file
                  _this.c_hd_size = res.size
                  setTimeout(() => {
                    _this.$refs.proBar_0.endProgressBar()
                    _this.proBar_0 = false
                    _this.imageUrl_0 = URL.createObjectURL(param.file)
                  }, 1000)
                  break
                case type === 1:
                  _this.proBar_1 = true
                  _this.$refs.proBar_1.startProgressBar()
                  _this.imageUrl_1_file = param.file
                  _this.shSize_1 = res.size
                  _this.uploadAdminImageData(param.file, function(res) {
                    if (res && res.code === 200) {
                      _this.$refs.proBar_1.endProgressBar()
                      // _this.shSize_1 = res.size
                      _this.proBar_1 = false
                      _this.imageUrl_1 = res.url
                      _this.dataList.top_img = res.url
                    } else {
                      _this.$refs.proBar_1.endProgressBar()
                      // _this.shSize_1 = res.size
                      _this.proBar_1 = false
                      // _this.imageUrl_1 = res.data
                    }
                  })
                  // setTimeout(() => {
                  //   _this.$refs.proBar_1.endProgressBar()
                  //   _this.shSize_1 = res.size
                  //   _this.proBar_1 = false
                  //   _this.imageUrl_1 = URL.createObjectURL(param.file)
                  // }, 1000)
                  break
                default:
                  break
              }
            }
          })
        }
      })
    },
    // 保存（添加）
    save() {
      this.addAdminData()
    },
    // 修改
    async saveEdit() {
      this.editAdminData()
    },
    // 添加
    addAdminData() {
      if (this.dataList.top_img === '') {
        this.$message({
          message: '请上传头像',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        username: this.dataList.username,
        phone: this.dataList.phone,
        password: this.dataList.password,
        user_head: this.dataList.user_head
      }
      addAdmin(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'admin-management',
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
    editAdminData() {
      if (this.dataList.user_head === '') {
        this.$message({
          message: '请上传头像',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      const jsonData = {
        id: this.dataList.id,
        username: this.dataList.username,
        phone: this.dataList.phone,
        password: this.dataList.password,
        user_head: this.dataList.user_head
      }
      editAdmin(jsonData).then(res => {
        if (res && res.code === 200) {
          // console.log(res)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false
          this.$router.push({
            name: 'admin-management',
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
    // 返回列表
    openList() {
      this.$router.push({
        name: 'admin-management',
        query: { showType: '0' }
      })
    },
    resetForm() {
      this.$refs.workCon.resetFields()
    }
  }
}
</script>

<style lang="scss">
.add_edit_admin_container {
  .add_editor_admin_card {
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
.add_edit_admin_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .add_editor_admin_header {
    // padding-top: 20px;
  }
  .add_editor_admin_header_list {
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
