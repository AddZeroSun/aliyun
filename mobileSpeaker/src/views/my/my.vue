<template>
  <div class="my">
    <div class="user_info_con">
      <van-icon class="user_setting"
                name="setting"
                @click="openUserInfo"
                color="#ffffff" />
      <div class="user_img_con">
        <img src="../../assets/images/my/head.jpg"
             class="user_img"
             alt="">
      </div>
      <div class="user_info">
        <van-row>
          <van-col span="24">
            <p class="user_msg">
              <span class="user_name">yu</span>
            </p>
            <p class="user_msg user_msg_t">
              <span class="user_id">学号: 12306</span>
            </p>
          </van-col>
        </van-row>
      </div>
      <div class="vip_info">
        <van-row>
          <van-col span="8"
                   class="col_border_right">
            <p class="info_value">
              <span>1000</span>
            </p>
            <p class="info_text">
              会员积分
            </p>
          </van-col>
          <van-col span="8"
                   class="col_border_right">
            <p class="info_value">
              <span>1000</span>
            </p>
            <p class="info_text">
              会员余额
            </p>
          </van-col>
          <van-col span="8">
            <p class="info_value">
              <span>1000</span>
            </p>
            <p class="info_text">
              优惠券
            </p>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="user_orders">
      <div class="container_title">
        <van-cell title="全部订单"
                  is-link
                  to="/myorders"
                  value="查看全部订单"></van-cell>
      </div>
      <van-divider class="divider" />
      <van-row class="container">
        <van-col span="6">
          <van-icon name="balance-pay"
                    color="#f2d39c"
                    size="30px" />
          <p class="icon_text">
            待付款
          </p>
        </van-col>
        <van-col span="6">
          <van-icon name="certificate"
                    color="#f2d39c"
                    size="30px" />
          <p class="icon_text">
            已付款
          </p>
        </van-col>
        <van-col span="6">
          <van-icon name="scan"
                    color="#f2d39c"
                    size="30px" />
          <p class="icon_text">
            未核销
          </p>
        </van-col>
        <van-col span="6">
          <van-icon name="failure"
                    color="#f2d39c"
                    size="30px" />
          <p class="icon_text">
            已取消
          </p>
        </van-col>
      </van-row>
    </div>

    <div class="user_settings">
      <van-cell-group class="person_serve">
        <van-cell title="订阅服务"
                  icon="bullhorn-o"
                  is-link>
          <van-switch slot="right-icon"
                      :value="subscribeIsChecked"
                      size="16px"
                      @input="subscribe()" />
        </van-cell>
        <van-cell title="VIP服务"
                  icon="diamond-o"
                  is-link />
        <van-cell title="课程邀请"
                  icon="envelop-o"
                  is-link />
        <van-cell title="我的足迹"
                  icon="logistics"
                  is-link
                  to="/mytrace" />
        <van-cell title="收藏课程"
                  icon="like-o"
                  is-link
                  to="/mycollect" />
        <van-cell title="收藏讲师"
                  icon="user-o"
                  is-link
                  to="/lecturercollect"/>
      </van-cell-group>

      <van-cell-group class="member_serve">
        <van-cell title="讲师中心"
                  icon="friends-o"
                  is-link
                  to="/lecturercenter" />
        <van-cell title="分销中心"
                  icon="cluster-o"
                  is-link />
      </van-cell-group>

      <van-cell-group class="bind_phone">
        <van-cell title="绑定手机"
                  icon="phone-circle-o"
                  is-link />
      </van-cell-group>
    </div>

    <!-- <div class="web_footer">阿里巴巴达摩院</div> -->
  </div>
</template>

<script>
export default {
  name: 'my',
  components: {
  },
  data () {
    return {
      subscribeIsChecked: true
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
    openUserInfo () {
      this.$router.push({ name: 'user-info', query: {} })
    },
    subscribe () {
      if (this.subscribeIsChecked === true) {
        this.subscribeIsChecked = false
      } else {
        this.subscribeIsChecked = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
  .user_info_con {
    background: #ea7375;
    //   background-image: url(https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png)
    margin-bottom: 6px;
    .user_setting {
      position: absolute;
      right: 14px;
      top: 14px;
      animation: infiniteRotate 4s linear infinite;
    }
    @keyframes infiniteRotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .user_img_con {
      text-align: center;
      padding-top: 26px;
    }
    .user_img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    .user_info {
      padding-bottom: 13px;
    }
    .user_msg {
      font-size: 13px;
      color: #ffffff;
      text-align: center;
    }
    .user_name {
      font-size: 15px;
      font-weight: bold;
    }
    .user_msg_t {
      padding-top: 10px;
    }
  }

  .vip_info {
    height: 100px;
    padding-top: 10px;
    background-color: #ffffff;
    text-align: center;
    .col_border_right {
      border-right: 1px solid #e4e7ed;
    }
    .info_value {
      font-size: 20px;
      color: #f2d39c;
      line-height: 40px;
    }
    .info_text {
      font-size: 16px;
      line-height: 40px;
      color: #303133;
    }
  }

  .user_orders {
    background-color: #ffffff;
    padding-bottom: 20px;

    .van-cell__title {
      font-weight: bold;
      font-size: 16px;
    }

    .divider {
      text-align: center;
      margin: 8px auto;
      border-color: #e4e7ed;
      width: 90%;
    }
    .container {
      text-align: center;
      .icon_text {
        font-size: 16px;
        color: #303133;
      }
    }
  }

  .user_settings {
    background-color: #eee;
    .person_serve {
      margin-top: 8px;
    }
    .member_serve {
      margin-top: 8px;
    }
    .bind_phone {
      margin-top: 8px;
    }
  }

  .web_footer {
    width: 100%;
    height: 90px;
    padding-top: 20px;
    text-align: center;
    font-size: 14px;

    color: #909399;
    background-color: #eee;
  }
}
</style>
