<template>
  <div class="member_order">
    <div class="contents">
      <div class="title">
        <van-nav-bar title="确认订单" left-text right-text left-arrow @click-left="onClickLeft" />
      </div>
      <section class="order_detail">
        <h2 class="order_detail_block">订单详情</h2>
        <van-cell-group>
          <van-cell title="商品名称" value="语文" />
          <van-cell title="订单编号" value="E201542" />
          <van-cell title="商家名称" value="spaceX" />
          <van-cell title="商品价格" value="￥300.00" value-class="green_price"></van-cell>
        </van-cell-group>
      </section>
      <section class="order_rest_pay">
        <van-cell-group>
          <van-cell title="还需支付" value="￥300.00" value-class="green_price"></van-cell>
        </van-cell-group>
      </section>
      <section class="order_way_pay">
        <h2 class="order_detail_block">选择支付方式</h2>
        <van-row class="way_pay_row we_pay_row_head" type="flex" justify="center" gutter="10" @click="gotoPayByWechat()">
          <van-col class="way_pay_head" span="4">
            <img src="@/assets/images/icon/we_chat_pay.png" />
          </van-col>
          <van-col span="18">
            <div class="way_pay_con">
              <p class="con_title">微信支付</p>
              <p class="con_tips">微信支付,安全快捷(必须使用微信内置浏览器)</p>
            </div>
          </van-col>
          <van-col class="way_pay_foot" span="2">
            <van-icon class="foot_arrow" name="arrow" />
          </van-col>
        </van-row>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  components: {},
  data() {
    return {
      showSex: false,
      showData: false,
      currentDate: new Date(),
      minDate: new Date(1368, 1, 1),
      maxDate: new Date(),
      end_time: "",
      sexList: [{ name: "男", id: "0" }, { name: "女", id: "1" }],
      dataList: {
        nick_name: "",
        name: "",
        sex: "",
        showData: "",
        phone: "",
        data: "",
        qqnum: "",
        message: ""
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    gotoPayByWechat() {
      console.log("go to pay it");
      
    },
  }
};
</script>
<style lang="scss">
.member_order {
  .members_tab {
    .van-tabs__line {
      // width: 50%!important;
    }
  }
  .van-nav-bar__arrow {
    color: #969799;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
.member_order {
  height: 100vh;
  //顶部标题栏
  .title {
    .van-nav-bar__arrow {
      color: #969799;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .contents {
    // 灰色标题
    .order_detail_block {
      margin: 0;
      padding: 16px 16px 16px;
      color: rgba(69, 90, 100, 0.6);
      font-weight: normal;
      font-size: 14px;
    }
    .order_rest_pay {
      margin-top: 14px;
    }
    // 绿色价格样式
    .green_price {
      font-size: 14px;
      color: green;
    }
    .order_way_pay {
      font-size: 12px;
      .way_pay_row {
        box-sizing: border-box;
        width: 100%;
        padding: 0.1rem 0.16rem;
        border-bottom: 1px solid #ebedf0;
        background-color: #ffffff;

        .we_pay_row_head {
          border-top: 1px solid #ebedf0;
        }

        .way_pay_head {
          display: flex;
          justify-content: center;
          align-items: center;
          & > img {
            width: 100%;
          }
        }

        .way_pay_con {
          .con_tips {
            color: #969799;
          }
          p {
            // line-height: 24px;
            padding: 2px 0;
          }
        }

        .way_pay_foot {
          .van-icon {
            margin: 0 auto;
            color: #969799;
          }
        }
        .van-col {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
