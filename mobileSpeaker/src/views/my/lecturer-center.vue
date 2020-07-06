<template>
  <div class="mytrace">
    <div class="title">
      <van-nav-bar title="申请讲师"
                   left-text=""
                   right-text=""
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="info">
      <p>尊敬的<span>张三</span>:</p>
      <p class="info_msg">欢迎申请为讲师，认真填写以下各项信息有利于审核通过哦~</p>
    </div>
    <div class="form">
      <van-cell-group>
        <van-field v-model="form.name"
                   label="讲师名称:"
                   placeholder="请输入用户名" />
        <van-field v-model="form.phone"
                   label="手机号码:"
                   placeholder="请输入手机号"
                   error-message="" />
        <van-field v-model="form.qq"
                   label="讲师QQ:"
                   placeholder="请输入用户名" />
        <van-field v-model="form.qq_group"
                   label="QQ群:"
                   placeholder="请输入用户名" />
        <van-field v-model="form.introduce"
                   rows="3"
                   autosize
                   label="讲师介绍:"
                   type="textarea"
                   maxlength="50"
                   placeholder="请输入介绍"
                   show-word-limit />
      </van-cell-group>
    </div>
    <div class="upload">
      <van-grid :border="false"
                :column-num="2">
        <van-grid-item>
          <van-uploader :before-read="beforeRead">
            <van-image round
                       width="71px"
                       height="71px"
                       src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </van-uploader>
          <p class="upload_text">上传讲师头像</p>
        </van-grid-item>
        <van-grid-item>
          <van-uploader :before-read="beforeRead">
            <van-image round
                       width="71px"
                       height="71px"
                       src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </van-uploader>
          <p class="upload_text">微信二维码</p>
        </van-grid-item>
      </van-grid>
      <p class="upload_tips">头像和二维码建议尺寸200*200像素，格式为jpg</p>
    </div>
    <div class="privilege">
      <div class="title">讲师特权</div>
      <div class="content_cell">
        <div class="con_img">
          <van-image round
                     width="60px"
                     height="60px"
                     src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="con_main">
          <div class="con_main_head">课程收入</div>
          <div class="con_main_foot">课程每出售一次，即可收入课程佣金</div>
        </div>
      </div>
      <div class="content_cell">
        <div class="con_img">
          <van-image round
                     width="60px"
                     height="60px"
                     src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="con_main">
          <div class="con_main_head">自由提现</div>
          <div class="con_main_foot">收入存入账户，可提现到微信钱包</div>
        </div>
      </div>
    </div>
    <div class="submit">
        <van-button type="info" size="large">提交申请</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'mytrace',
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        qq: '',
        qq_group: '',
        introduce: ''
      }
    }
  },
  computed: {
  },
  watch: {

  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    beforeRead (file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片')
        return false
      }
      return true
    },

    // 返回 Promise
    asyncBeforeRead (file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片')
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        } else {
          resolve()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mytrace {
  background-color: #ffffff;
  padding-bottom: 50px;
  .title {
    .van-nav-bar__arrow {
      color: #969799;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .info {
    background-color: #ffffff;
    box-sizing: border-box;
    // height: 200px;
    width: 100%;
    padding: 20px 12px 16px 12px;
    font-size: 14px;
    color: #303133;
    line-height: 28px;

    & > p > span {
      color: #409eff;
      font-size: 15px;
    }

    .info_msg {
      text-indent: 2em;
    }
  }

  .form {
    background-color: #ffffff;
    width: 100%;
    //   height: 400px;
  }

  .upload {
    background-color: #ffffff;
    box-sizing: border-box;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    padding-bottom: 10px;
    .upload_text {
      text-align: center;
      font-size: 14px;
      color: #606266;
    }
    .upload_tips {
      text-align: center;
      font-size: 12px;
      color: #909399;
      line-height: 30px;
    }
  }

  .privilege {
    .title {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      color: #323233;
      line-height: 50px;
      padding-left: 10px;
      padding-top: 10px;
    }

    .content_cell {
      padding: 20px;
      border-bottom: 1px solid #dedede;
      .con_img {
        display: inline-block;
        width: 64px;
        height: 64px;
        vertical-align: middle;
      }
      .con_main {
        display: inline-block;
        height: 48px;
        margin-left: 20px;
        vertical-align: middle;
        .con_main_head {
          height: 24px;
          color: #606266;
          font-size: 16px;
          line-height: 24px;
        }
        .con_main_foot {
          height: 24px;
          color: #909399;
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
  }

  .submit {
      padding: 0 20px;
  }
}
</style>
