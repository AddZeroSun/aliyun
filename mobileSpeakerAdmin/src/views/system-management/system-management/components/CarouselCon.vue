<template>
  <div class="carousel_container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
        <el-form
          ref="carouselCon"
          :model="dataList"
          :rules="rules"
          label-width="100px"
          class="demo-dataList"
        >
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
              <el-form-item label="轮播图" prop="top_img">
                <div class="upload_con">
                  <el-upload
                    class="original_image"
                    :action="action()"
                    drag
                    :data="setting_1_Data"
                    :show-file-list="false"
                    :http-request="uploadImg"
                    :before-upload="beforeUpload"
                  >
                    <img v-if="imageUrl_1" :src="imageUrl_1" class="original_image_avatar" />
                    <i v-else class="el-icon-plus original_image_icon"></i>
                    <div v-if="imageUrl_1" class="hover_con">
                      <p class="hover_con_list">
                        <i class="hover_con_msg el-icon-plus"></i>
                        <i
                          class="hover_con_msg el-icon-zoom-in"
                          @click.stop="openImageView(imageUrl_1)"
                        ></i>
                      </p>
                    </div>
                  </el-upload>
                  <progress-bar ref="proBar_1" :showprogress="proBar_1"></progress-bar>
                </div>
                <div>
                  <p class="msg">图片仅支持JPG、JPEG、PNG格式。</p>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="排序" prop="sort">
                <el-input-number v-model="dataList.sort" size="small" :min="1" :max="99" />
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
              <el-form-item label="标题" prop="title">
                <el-input v-model="dataList.title" :maxlength="11" placeholder="请输入标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
              <el-form-item label="链接地址" prop="callback_url">
                <el-input v-model="dataList.callback_url" placeholder="请输入链接地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
              <el-form-item label="描述">
                <el-input
                  v-model="dataList.desc"
                  type="textarea"
                  placeholder="请输入图片描述"
                  maxlength="30"
                  :autosize="{ minRows: 8 }"
                  show-word-limit
                >
                </el-input>
                <div>
                  <p class="msg">介绍性文字</p>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 图片放大 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" class="show_image" :src="viewImageUrl" alt />
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProgressBar from '@/components/progress-bar'
import { uploadBannerImage } from '@/api/systemManagement.js'
export default {
  name: 'CarouselCon',
  components: {
    ProgressBar
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 添加还是编辑页面
      typeCon: this.type,
      dataDetail: this.list,
      dataList: {
        id: '', // 图片ID
        title: '', // 标题
        desc: '', // 描述
        top_img: '', // 轮播图
        callback_url: '', // 链接地址
        is_show: 1, // 是否显示 1显示 2隐藏 默认1
        sort: 1 // 权重 默认0
      },
      imagecropperShow: false,
      resImagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      viewImageUrl: '',
      dialogVisible: false,
      // 轮播图
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
        top_img: [
          { required: true, message: '请上传轮播图', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请输入顺序', trigger: 'change' }
        ],
        is_show: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    type(val) {
      this.typeCon = parseInt(val)
    },
    list(val) {
      this.dataDetail = val
      this.dataList.id = this.dataDetail.id
      this.dataList.title = this.dataDetail.title
      this.dataList.desc = this.dataDetail.desc
      this.imageUrl_1 = this.dataDetail.image
      this.dataList.top_img = this.dataDetail.image
      this.dataList.callback_url = this.dataDetail.callback_url
      this.dataList.is_show = this.dataDetail.is_show
      this.dataList.sort = this.dataDetail.sort
    },
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
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 放大图片
    openImageView(_imgUrl) {
      this.viewImageUrl = _imgUrl
      this.dialogVisible = true
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
            // this.$message.error(`上传图片大小不能超过 ${_size}MB!`)
            // callback(0)
            // return false
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
    uploadCarouselImageData(_file, callback) {
      // const _this = this
      const formData = new FormData()
      formData.append('file', _file)
      uploadBannerImage(formData)
        .then(res => {
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    action(val) {
      // this.imgType = val
      return 'uplodResultsScore'
    },
    beforeUpload(file) {
      const promise = new Promise(resolve => {
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
          _this.checkImageSize(
            param.file,
            param.data.width,
            param.data.height,
            param.data.isCheckImage,
            function(resS) {
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
                    }, 6000)
                    break
                  case type === 1:
                    _this.proBar_1 = true
                    _this.$refs.proBar_1.startProgressBar()
                    _this.imageUrl_1_file = param.file
                    _this.shSize_1 = res.size
                    _this.uploadCarouselImageData(param.file, function(res) {
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
            }
          )
        }
      })
    },
    // 提交
    submitForm() {
      return new Promise((resolve, reject) => {
        this.$refs.carouselCon.validate(valid => {
          if (valid) {
            // this.$emit('submit-work-con', this.dataList)
            const data = {
              code: 200,
              data: this.dataList
            }
            // callback(data)
            resolve(data)
          } else {
            const data = {
              code: 500,
              data: this.dataList
            }
            // callback(data)
            resolve(data)
            return false
          }
        })
      })
    },
    resetForm() {
      this.$refs.workCon.resetFields()
    }
  }
}
</script>

<style lang="scss">
.carousel_container {
  .el-dialog__body {
    // 放大图片居中
    text-align: center;
  }
  // 作品图
  // 原图
  .original_image {
    height: 160px;
  }
  .original_image .el-upload {
    width: 240px;
    height: 160px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .original_image .el-upload:hover {
    border-color: #409eff;
  }
  .original_image_icon {
    font-size: 28px;
    color: #8c939d;
    width: 240px;
    height: 160px;
    line-height: 160px;
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
  .el-upload-dragger {
    background-color: none;
    border: 0px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 240px;
    height: 160px;
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
.carousel_container {
  .msg {
    line-height: 10px;
    color: #999999;
  }
  // 边距
  .img_list_top {
    padding-top: 20px;
  }
  .msg {
    color: #999999;
  }
  // 预览上传
  .hover_con {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    font-size: 20px;
    // opacity: 0.5;
  }
  .hover_con_msg {
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
  }
  .original_image:hover {
    position: relative;
    .hover_con {
      display: block;
    }
  }
  .original_image .el-upload--text:hover {
    .hover_con {
      display: block;
    }
  }
  // 作品图
  // 原图
  .upload_con {
    width: 240px;
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
    width: 120px;
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
  .show_image {
    max-width: 500px;
    object-fit: contain;
  }
}
</style>

