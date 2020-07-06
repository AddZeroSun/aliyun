<template>
  <div class="chapter_container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
        <el-form
          ref="chapterCon"
          :model="dataList"
          :rules="rules"
          label-width="100px"
          class="demo-dataList"
        >
          <!-- <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="课程id" prop="phone">
                <el-input v-model="dataList.phone" :maxlength="11" placeholder="请输入课程id"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="课程名称" prop="course_name">
                <el-input v-model="dataList.course_name" :maxlength="11" placeholder="请输入课程名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="讲师" prop="teacher_name">
                <el-input v-model="dataList.teacher_name" :maxlength="20" placeholder="请输入讲师姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="讲师" prop="teacher_id">
                <el-select v-model="dataList.teacher_id" placeholder="请选择">
                  <el-option
                    v-for="item in teacher_options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right">ID：{{ item.id }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="课程规格" prop="course_spe">
                <el-select v-model="dataList.course_spe" placeholder="请选择">
                  <el-option
                    v-for="item in spec_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="章节" prop="chapter_number">
                <!-- <el-input v-model="dataList.chapter_number" :maxlength="20" placeholder="请输入章节数"></el-input> -->
                <span v-if="typeCon === 0" class="span_tips">需先完成添加课程，然后在章节管理页面添加章节(此处默认章节为0)</span>
                <span v-if="typeCon === 1" class="span_txt">{{ dataList.chapter_number }}</span>
                <span v-if="typeCon === 1" class="span_tips">需在章节管理页面编辑章节</span>
                <el-button v-if="typeCon === 1 && dataList.chapter_number === 0" size="small" type="primary" icon="el-icon-plus" @click="openChapterDialog">添加</el-button>
                <el-button v-if="typeCon === 1 && dataList.chapter_number !== 0" size="small" type="primary" icon="el-icon-edit" @click="openChapterDialog">编辑</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="价格" prop="price">
                <el-input v-model="dataList.price" :maxlength="20" placeholder="请输入价格"></el-input>
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
              <el-form-item label="是否推荐" prop="is_recommend">
                <el-radio-group v-model="dataList.is_recommend">
                  <el-radio :label="1">推荐</el-radio>
                  <el-radio :label="2">不推荐</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="权重" prop="sort">
                <el-input-number v-model="dataList.sort" size="small" :min="0" :max="999" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="状态" prop="nick_name">
                <el-select v-model="dataList.nick_name" placeholder="请选择">
                  <el-option
                    v-for="item in status_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
              <el-form-item label="封面图" prop="top_img">
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
                  <p class="msg">图片仅支持JPG、JPEG、PNG格式，文件小于200KB。建议：长宽1:1，尺寸小于500像素。</p>
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
// import ImageCropper from '@/components/ImageCropper'
// import { getArtistType, uploadArtistImage } from '@/api/artistManagement.js'
import { uploadCourseImage, getTeacherId } from '@/api/courseManagement.js'
export default {
  name: 'WorkCon',
  components: {
    ProgressBar
    // ImageCropper
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
      // 添加还是详情页面
      typeCon: this.type, // 添加0 修改1
      dataDetail: this.list,
      dataList: {
        acourse_id: '',
        type: 1, // 用户类型
        teacher_id: '', // 讲师id
        course_name: '', // 课程名称
        teacher_name: '', // 讲师姓名
        // top_img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 主页图
        top_img: '', // 主页图
        learn_num: 0, // 学习人数 默认0
        collect_num: 0, // 收藏数量 默认0
        course_spe: '', // 课程规格
        chapter_number: 0, // 课程章节 默认0
        price: '', // 价格
        is_show: 1, // 是否显示 1显示 2隐藏 默认1
        is_recommend: 1, // 是否推荐 1推荐 2不推荐 默认1
        sort: 0 // 权重 默认0
      },
      // 规格列表
      spec_options: [
        {
          value: 1,
          label: 'label'
        }
      ],
      teacher_options: [],
      // 状态列表
      //   status_options: [
      //     { id: '', name: '全部' },
      //     { id: 2, name: '待审核' },
      //     { id: 1, name: '正常' },
      //     { id: 3, name: '禁用' }
      //   ],
      //   artistTypeList: [{ scene_id: 1, scene_name: '客厅' }],
      imagecropperShow: false,
      resImagecropperShow: false,
      imagecropperKey: 0,
      // image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
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
        // phone: [{ required: false, message: '请输入手机号', trigger: 'blur' }],
        // header_url: [
        //   { required: true, message: '请上传头像', trigger: 'change' }
        // ],
        top_img: [
          { required: true, message: '请上传主页图', trigger: 'change' }
        ],
        is_show: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ],
        is_recommend: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'change' }
        ],
        chapter_number: [
          { required: true, message: '请添加章节', trigger: 'change' }
        ],
        course_name: [
          { required: true, message: '请输入课程名称', trigger: 'change' },
          { min: 0, max: 20, message: '昵称在 1 到 20 个字符', trigger: 'blur' }
        ],
        teacher_id: [
          { required: true, message: '请选择讲师', trigger: 'change' }
        ],
        // teacher_name: [
        //   { required: true, message: '请输入讲师名称', trigger: 'change' },
        //   { min: 0, max: 20, message: '昵称在 1 到 20 个字符', trigger: 'blur' }
        // ],
        // password: [
        //   { required: false, message: '请输入密码', trigger: 'change' },
        //   {
        //     pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/,
        //     message: '密码为4-16位（含16）英文数字组合'
        //   }
        //   // { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{4,16}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 4 - 16位，（判断的时候不区分大小写)' }
        // ],
        // sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        acourse_type: [
          {
            type: 'array',
            required: false,
            message: '请选择风格领域',
            trigger: 'change'
          }
        ]
        // desc: [{ required: false, message: '请填写活动形式', trigger: 'blur' }]
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
      this.dataList.teacher_id = this.dataDetail.teacher_id
      this.dataList.course_name = this.dataDetail.name
      this.dataList.teacher_name = this.dataDetail.teacher_name
      this.dataList.top_img = this.dataDetail.image
      this.imageUrl_1 = this.dataDetail.image
      this.dataList.learn_num = this.dataDetail.learn_num
      this.dataList.collect_num = this.dataDetail.collect_num
      this.dataList.course_spe = this.dataDetail.course_spe
      this.dataList.chapter_number = this.dataDetail.chapter_number
      this.dataList.price = this.dataDetail.price
      this.dataList.is_show = this.dataDetail.is_show
      this.dataList.is_recommend = this.dataDetail.is_recommend
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
  created() {
    // 获取所有名师id和对应姓名
    this.getTeacherIdList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 获取艺术家类型
    // getArtistTypeData() {
    //   getArtistType()
    //     .then(res => {
    //       if (res.data && res.status === 200) {
    //         this.artistTypeList = res.data
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // 获取所有名师id和对应姓名
    getTeacherIdList() {
      getTeacherId()
        .then(res => {
          if (res.data && res.code === 200) {
            this.teacher_options = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 打开章节添加对话框
    openChapterDialog() {
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
      this.uploadCourseImageData(resData.file, function(res) {
        if (res && res.code === 200) {
          _this.$refs.imageCropper.uploadEnd()
          _this.imagecropperShow = false
          _this.imagecropperKey = _this.imagecropperKey + 1
          _this.imageUrl_0 = res.data
          _this.dataList.header_url = res.data
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
    uploadCourseImageData(_file, callback) {
      // const _this = this
      const formData = new FormData()
      formData.append('file', _file)
      uploadCourseImage(formData)
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
                    }, 1000)
                    break
                  case type === 1:
                    _this.proBar_1 = true
                    _this.$refs.proBar_1.startProgressBar()
                    _this.imageUrl_1_file = param.file
                    _this.shSize_1 = res.size
                    _this.uploadCourseImageData(param.file, function(res) {
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
        this.$refs.chapterCon.validate(valid => {
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
.chapter_container {
  .el-dialog__body {
    // 放大图片居中
    text-align: center;
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
    border-color: #409eff;
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
  .el-upload-dragger {
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
.chapter_container {
  // 边距
  .img_list_top {
    padding-top: 20px;
  }
  .msg {
    color: #999999;
    line-height: 18px;
  }
  .span_txt {
    margin-right: 20px;
  }
  .span_tips {
    color: #F56C6C;
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

