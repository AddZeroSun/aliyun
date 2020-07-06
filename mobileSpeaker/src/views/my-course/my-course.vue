<template>
  <div class="my_course">
    <div class="contents">
      <div class="header_con">
        <img class="members_ban" src="@/assets/images/icon/banner.jpg"/>
        <div class="header_list">
          <img class="header" src="@/assets/images/my/head.jpg"/>
          <p class="header_title">111</p>
        </div>
      </div>
      <div class="members_tab">
        <van-tabs v-model="active" title-active-color="#d2bd7a" color="#d2bd7a">
          <van-tab title="全部课程">
            <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/banner.jpg" class="content_list_img"/>
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con"><span class="content_list_title">课程名称：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">课程规格：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">核销状态：已核销</span></div>
                <div class="content_list_con"><span class="content_list_title">有效期限：365天</span></div>
                <div class="content_list_con"><span class="content_list_title">下单时间：2015-12-04</span></div>
                <!-- <div class="content_list_con content_list_con_b">
                  <span class="content_list_price">300￥</span>
                  <span class="content_list_c content_list_m">|</span>
                  <span class="content_list_c">32节</span>
                </div> -->
              </van-col>
              <span class="open_btn">查看</span>
            </van-row>
          </van-tab>
          <van-tab title="待付款">
            <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/banner.jpg" class="content_list_img"/>
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con"><span class="content_list_title">课程名称：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">课程规格：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">核销状态：已核销</span></div>
                <div class="content_list_con"><span class="content_list_title">有效期限：365天</span></div>
                <div class="content_list_con"><span class="content_list_title">下单时间：2015-12-04</span></div>
                <!-- <div class="content_list_con content_list_con_b">
                  <span class="content_list_price">300￥</span>
                  <span class="content_list_c content_list_m">|</span>
                  <span class="content_list_c">32节</span>
                </div> -->
              </van-col>
              <span class="open_btn">立即支付</span>
            </van-row>
          </van-tab>
          <van-tab title="已付款">
            <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/banner.jpg" class="content_list_img"/>
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con"><span class="content_list_title">课程名称：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">课程规格：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">核销状态：已核销</span></div>
                <div class="content_list_con"><span class="content_list_title">有效期限：365天</span></div>
                <div class="content_list_con"><span class="content_list_title">下单时间：2015-12-04</span></div>
                <!-- <div class="content_list_con content_list_con_b">
                  <span class="content_list_price">300￥</span>
                  <span class="content_list_c content_list_m">|</span>
                  <span class="content_list_c">32节</span>
                </div> -->
              </van-col>
              <span class="open_btn">评价课程</span>
            </van-row>
          </van-tab>
          <van-tab title="未销核">
             <van-row class="content_list">
              <van-col span="12" class="content_list_l">
                <img src="@/assets/images/icon/banner.jpg" class="content_list_img"/>
              </van-col>
              <van-col span="12" class="content_list_r">
                <div class="content_list_con"><span class="content_list_title">课程名称：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">课程规格：国学</span></div>
                <div class="content_list_con"><span class="content_list_title">核销状态：已核销</span></div>
                <div class="content_list_con"><span class="content_list_title">有效期限：365天</span></div>
                <div class="content_list_con"><span class="content_list_title">下单时间：2015-12-04</span></div>
                <!-- <div class="content_list_con content_list_con_b">
                  <span class="content_list_price">300￥</span>
                  <span class="content_list_c content_list_m">|</span>
                  <span class="content_list_c">32节</span>
                </div> -->
              </van-col>
              <span class="open_btn">删除订单</span>
            </van-row>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Row, Col } from 'vant'
export default {
  name: 'Home',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Row.name]: Row,
    [Row.Col]: Col
  },
  data () {
    return {
      active: 0
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
    indexListData () {
    }
  }
}
</script>
<style lang="scss">
.my_course {
  .members_tab {
    .van-tabs__line {
      // width: 50%!important;
    }
  }
}
</style>
<style lang="scss" scoped>
.my_course {
  .contents {
    // background: #ffffff;
    width: 100%;
  }
  // banner
  .members_ban {
    width: 100%;
  }
  // 头像
  .header_con {
    position: relative;
  }
  .header_list {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .header {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .header_title {
    font-size: 15px;
    color: #ffffff;
    text-align: center;
  }
  .members_tab {
    position: relative;
    top: -13px;
  }
  // 课程列表
  .content_list {
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 17px;
    padding-bottom: 17px;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
  }
  .content_list_l {
    width: 158px;
  }
  .content_list_r {
    padding-left: 15px;
  }
  .content_list_img {
    width: 158px;
    height: 97.5px;
  }
  .content_list_con {
    line-height: 13px;
  }
  .content_list_con_b {
    padding-top: 13px;
    padding-bottom: 8px;
  }
  .content_list_title {
    font-size: 13px;
  }
  .content_list_price {
    font-size: 13px;
    color: #cfc19a;
  }
  .content_list_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  .content_list_c {
    font-size: 13px;
    color: #b0b0b0;
  }
  .content_list_btn {
    display: inline-block;
    width: 47px;
    height: 20px;
    font-size: 13px;
    background: #a98e5f;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
    border-radius: 10px;
  }
  .open_btn {
    display: inline-block;
    // width: 50px;
    padding-left:10px;
    padding-right: 10px;
    height: 25px;
    line-height: 27px;
    background: #f2d39c;
    text-align: center;
    font-size: 15px;
    position: absolute;
    right: 13px;
    top: 50%;
    // transform: translateY(-50%);
    color: #7c633a;
    border-radius: 15px;
  }
}
</style>
