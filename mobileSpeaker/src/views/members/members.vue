<template>
  <div class="members">
    <div class="contents">
      <div>
        <img class="members_ban" src="@/assets/images/vip_bg.png" />
      </div>
      <div class="members_tab">
        <van-tabs v-model="active" title-active-color="#d2bd7a" color="#d2bd7a">
          <div class="is_mem_con">
            <span class="is_mem_con_btn">我的vip：未开通</span>
          </div>
          <van-tab title="我的vip">
            <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/vip_icon.png" class="content_list_img" />
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con">
                  <span class="content_list_toy_i">￥</span>
                  <span class="content_list_top_p">200</span>
                </div>
                <div class="content_list_con content_list_con_b">
                  <span class="content_list_v">普通会员</span>
                </div>
                <div class="content_list_con">
                  <span class="content_list_time">有效期限：365天</span>
                </div>
                <span class="open_btn" @click="openOrder()">开通</span>
              </van-col>
            </van-row>
            <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/vip_icon.png" class="content_list_img" />
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con">
                  <span class="content_list_toy_i">￥</span>
                  <span class="content_list_top_p">200</span>
                </div>
                <div class="content_list_con content_list_con_b">
                  <span class="content_list_v">普通会员</span>
                </div>
                <div class="content_list_con">
                  <span class="content_list_time">有效期限：365天</span>
                </div>
                <span class="open_btn">开通</span>
              </van-col>
            </van-row>
            <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/vip_icon.png" class="content_list_img" />
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con">
                  <span class="content_list_toy_i">￥</span>
                  <span class="content_list_top_p">200</span>
                </div>
                <div class="content_list_con content_list_con_b">
                  <span class="content_list_v">普通会员</span>
                </div>
                <div class="content_list_con">
                  <span class="content_list_time">有效期限：365天</span>
                </div>
                <span class="open_btn">开通</span>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab title="订单记录">
            <van-panel title="订单编号" desc="1234586459" status="已发货"></van-panel>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Row, Col } from "vant";
import { Dialog } from 'vant';
export default {
  name: "Home",
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Row.name]: Row,
    [Row.Col]: Col
  },
  data() {
    return {
      active: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    indexListData() {},
    openOrder() {
      Dialog.confirm({
        title: "系统提示",
        message: "您即将前往商品支付页面"
      })
        .then(() => {
          this.$router.push({
            name: "memberorder",
            query: {}
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
.members {
  .members_tab {
    .van-tabs__line {
      width: 50% !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.members {
  .contents {
    // background: #ffffff;
    width: 100%;
  }
  // banner
  .members_ban {
    width: 100%;
  }
  .is_mem_con {
    background: #ffffff;
    text-align: center;
    height: 44px;
    line-height: 30px;
    margin-bottom: 8px;
  }
  // vip
  .is_mem_con_btn {
    display: inline-block;
    width: 105px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #a56371;
    font-size: 13px;
    text-align: center;
    border-radius: 15px;
  }
  .members_tab {
    position: relative;
    top: -13px;
  }
  // vip内容
  .content_list {
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 17px;
    padding-bottom: 17px;
    background: #ffffff;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
  }
  .content_list_l {
    width: 40px;
    height: 100%;
  }
  .content_list_r {
    padding-left: 15px;
  }
  .content_list_img {
    width: 40px;
    height: 40px;
    position: relative;
    top: 15px;
  }
  .content_list_con {
    line-height: 13px;
  }
  .content_list_con_b {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .content_list_toy_i {
    font-size: 13px;
  }
  .content_list_top_p {
    font-size: 18px;
    color: #bd6d2e;
  }
  .content_list_v {
    font-size: 15px;
    color: #7d7254;
  }
  .content_list_time {
    font-size: 15px;
    color: #9b9b9b;
  }
  .open_btn {
    display: inline-block;
    width: 50px;
    height: 25px;
    line-height: 27px;
    background: #f2d39c;
    text-align: center;
    font-size: 15px;
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #7c633a;
    border-radius: 15px;
  }
}
</style>
