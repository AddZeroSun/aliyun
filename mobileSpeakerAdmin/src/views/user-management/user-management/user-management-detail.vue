<template>
  <div class="artist_management_detail_container">
    <el-card class="artist_management_detail_card">
      <div slot="header" class="artist_management_detail_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="artist_management_detail_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 艺术家 -->
        <div class="work_content">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
              <el-form ref="artistCon" :model="dataList" label-width="100px" class="demo-dataList">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                    <el-form-item label="头像">
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
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="昵称" prop="nick_name">
                      <div>{{ dataList.nick_name }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="姓名">
                      <div>{{ dataList.real_name }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="性别">
                      <div>{{ dataList.sex }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="出生年月">
                      <div>{{ dataList.sex }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="手机号">
                      <!-- <el-input v-model="dataList.phone" placeholder="请输入手机号"></el-input> -->
                      <div>{{ dataList.phone }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="QQ号">
                      <!-- <el-input v-model="dataList.phone" placeholder="请输入手机号"></el-input> -->
                      <div>{{ dataList.phone }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <el-form-item label="毕业院校">
                      <div>{{ dataList.university }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-form-item label="用户简介">
                      <!-- <el-input v-model="dataList.info" placeholder="请输入艺术家简介"></el-input> -->
                      <!-- <el-input
                        v-model="dataList.info"
                        type="textarea"
                        placeholder="请输入艺术家简介"
                        maxlength="30"
                        :autosize="{ minRows: 8 }"
                        show-word-limit
                      >
                      </el-input>
                      <div>
                        <p class="msg">显示在艺术家主页，姓名下方的介绍性文字</p>
                      </div> -->
                      <div>{{ dataList.info }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 图片放大 -->
              <el-dialog width="800px" :visible.sync="dialogVisible">
                <img width="100%" class="show_image" :src="viewImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="div_con"></div>
      <div v-if="statusCon === 2" class="btn_con">
        <el-button class="sub_btn" type="primary" @click="changeTableStatus(status)">通过</el-button>
        <el-button class="sub_btn" type="primary" @click="changeTableStatus(4)">拒绝</el-button>
        <el-button class="sub_btn" type="primary" @click="openList">取消</el-button>
      </div>
      <div v-if="statusCon !== 2" class="btn_con">
        <el-button class="sub_btn" type="primary" @click="openList">返回列表</el-button>
        <!-- <el-button class="sub_btn" type="primary" @click="openDetail">修改</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '@/utils/mixin'
import { artistDetail, editArtistStatus } from '@/api/artistManagement.js'
export default {
  name: 'ArtistManagementDetail', // 详情
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
        artist_id: '',
        phone: '', // 手机号码
        type: '', // 用户类型
        nick_name: '', // 昵称
        real_name: '', // 姓名
        password: '', // 密码
        sex: '', // 性别1男  2女  0未知
        artist_type: '', // 艺术家风格
        honor: '', // 头衔
        university: '', // 毕业院校
        info: '' // 艺术家简介
      },
      viewImageUrl: '',
      dialogVisible: false,
      artistTypeList: [],
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
    this.artistDetailData(this.id)
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
    artistDetailData(_id) {
      const data = {
        artist_id: _id
      }
      artistDetail(data).then(res => {
        if (res.data && res.status === 200) {
          this.dataList.artist_id = res.data.artist_id
          this.dataList.phone = res.data.phone
          this.dataList.type = (res.data.type) === 1 ? '艺术家' : '权利人'
          this.dataList.nick_name = res.data.nick_name
          this.dataList.real_name = res.data.real_name
          this.dataList.sex = res.data.sex
          this.dataList.artist_type = (res.data.artist_type).map(item => {
            return item.type_name
          })
          this.dataList.artist_type = this.dataList.artist_type.join(',')
          this.dataList.honor = res.data.honor
          this.dataList.university = res.data.university
          this.dataList.info = res.data.info
          this.imageUrl_0 = res.data.header_url
          this.imageUrl_1 = res.data.top_img
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改状态
    editArtistStatusData(_artist_id, _status) {
      const formData = new FormData()
      formData.append('artist_id', _artist_id)
      formData.append('status', _status)
      editArtistStatus(formData).then(res => {
        if (res.data && res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.openList()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeTableStatus(_status) {
      if (_status === 4) {
        this.status = 4
      }
      this.editArtistStatusData(this.id, this.status)
    },
    openList() {
      this.$router.push({
        name: 'artist-management',
        query: {}
      })
    },
    // 编辑
    openDetail() {
      this.$router.push({
        name: 'edit-artist-management',
        query: { id: this.id, type: 1 }
      })
    }
  }
}
</script>

<style lang="scss">
.artist_management_detail_container {
  .artist_management_detail_card {
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
.artist_management_detail_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .pub_select {
    width: 100%;
  }
  .artist_management_detail_header {
    // padding-top: 20px;
  }
  .artist_management_detail_header_list {
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
    max-height: 700px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
