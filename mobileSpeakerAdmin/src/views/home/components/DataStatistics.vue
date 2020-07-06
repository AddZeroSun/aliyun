<template>
  <div class="data_sta">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="data_sta_list">
        <div class="data_sta_list_con">
          <img class="data_sta_img" src="../../../assets/home/home_3.png" alt="">
          <div class="data_sta_list_top">
            <div class="data_sta_list_top_l">
              <img src="../../../assets/home/home_3_1.png" class="data_sta_top_img" alt="">
            </div>
            <div class="data_sta_list_top_r">
              <p class="data_sta_top_msg">今日订单</p>
              <p class="data_sta_top_num">{{ dataList.total_order_num }}</p>
            </div>
          </div>
          <div class="data_sta_list_bottom">
            <p class="data_sta_list_bottom_msg">包含商品、版权、原作、复制品等全部类型</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="data_sta_list">
        <div class="data_sta_list_con">
          <img class="data_sta_img" src="../../../assets/home/home_4.png" alt="">
          <div class="data_sta_list_top">
            <div class="data_sta_list_top_l">
              <img src="../../../assets/home/home_4_1.png" class="data_sta_top_img" alt="">
            </div>
            <div class="data_sta_list_top_r">
              <p class="data_sta_top_msg">今日销售总额</p>
              <p class="data_sta_top_num">{{ dataList.total_order_price }}</p>
            </div>
          </div>
          <div class="data_sta_list_bottom">
            <p class="data_sta_list_bottom_msg">包含全部类型订单售额</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="data_sta_list">
        <div class="data_sta_list_con">
          <img class="data_sta_img" src="../../../assets/home/home_5.png" alt="">
          <div class="data_sta_list_top">
            <div class="data_sta_list_top_l">
              <img src="../../../assets/home/home_5_1.png" class="data_sta_top_img" alt="">
            </div>
            <div class="data_sta_list_top_r">
              <p class="data_sta_top_msg">今日访问</p>
              <p class="data_sta_top_num">{{ dataList.today_visit_num }}</p>
            </div>
          </div>
          <div class="data_sta_list_bottom">
            <p class="data_sta_list_bottom_msg">用户日活UV，不含新注册</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="data_sta_list">
        <div class="data_sta_list_con">
          <img class="data_sta_img" src="../../../assets/home/home_6.png" alt="">
          <div class="data_sta_list_top">
            <div class="data_sta_list_top_l">
              <img src="../../../assets/home/home_6_1.png" class="data_sta_top_img" alt="">
            </div>
            <div class="data_sta_list_top_r">
              <p class="data_sta_top_msg">今日注册</p>
              <p class="data_sta_top_num">{{ dataList.today_register_num }}</p>
            </div>
          </div>
          <div class="data_sta_list_bottom">
            <p class="data_sta_list_bottom_msg">含App、微信、移动端、营销活动</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import CountTo from 'vue-count-to'

export default {
  name: 'DataStatistics',
  components: {
    // CountTo
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dataDetail: this.list,
      dataList: {
        total_order_num: 0, // 今日订单总数
        total_order_price: 0, // 今日销售总额
        today_visit_num: 0, // 今日访问量
        today_register_num: 0 // 今日注册量
      }
    }
  },
  computed: {
  },
  watch: {
    list(val) {
      this.dataDetail = val
      this.dataList.total_order_num = this.dataDetail.total_order_num
      this.dataList.total_order_price = this.dataDetail.total_order_price
      this.dataList.today_visit_num = this.dataDetail.today_visit_num
      this.dataList.today_register_num = this.dataDetail.today_register_num
    }
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.data_sta {
  margin-top: calc(1.3 * 37px);
  .data_sta_list {
    padding-right: calc(1.3 * 20.5px);
  }
  .data_sta_list_con {
    // height: calc(1.3 * 124px);
    background: #FFFFFF;
    padding-bottom: calc(1.3 * 10px);
    position: relative;
  }
  .data_sta_img {
    position: absolute;
    width: calc(1.3 * 44px);
    height: calc(1.3 * 44px);
    top: calc(-1.3 * 17px);
    left: calc(1.3 * 16.5px);
  }
  .data_sta_list_top {
    // display: flex;
    overflow: hidden;
    border-bottom: 2px solid #F9F9F9;
    padding-bottom: calc(1.3 * 21.7px);
  }
  .data_sta_list_top_l {
    // float: left;
    position: absolute;
    padding-top: calc(1.3 * 42.9px);
    padding-left: calc(1.3 * 32px);
    //   width: 60%;
    // width: calc(1.3 * 203px);
  }
  .data_sta_list_top_r {
    padding-top: calc(1.3 * 23.5px);
    float: right;
    padding-right: calc(1.3 * 16.5px);
  }
  .data_sta_top_img {
    width: calc(1.3 * 90px);
    height: calc(1.3 * 25.4px);
  }
  .data_sta_top_msg {
    font-size: calc(1.3 * 14px);
    color: #999999;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .data_sta_top_num {
    font-size: calc(1.3 * 24px);
    color: rgba(0,0,0,0.85);
    text-align: center;
    margin-top: 8px;
    margin-bottom: 0px;
  }
  .data_sta_list_bottom {
    padding-top: calc(1.3 * 10px);
  }
  .data_sta_list_bottom_msg {
    font-size: calc(1.3 * 10px);
    color: #999999;
    text-align: right;
    padding-right: calc(1.3 * 16.5px);
    margin-top: 0px;
    margin-bottom: 0px;
  }
  @media (max-width: 1024px){
  // body{font-size: 18px}
  } /*<=1024的设备*/
  @media (max-width: 1100px) {
  // body{font-size: 20px}
  } /*<=1100的设备*/
  @media (max-width: 1280px) {
  // body{font-size: 22px;}
  } /*<=1280的设备*/
  @media (max-width: 1366px) {
  // body{font-size: 24px;}
  }

  @media (max-width: 1440px) {
  // body{font-size: 25px !important;}
  }
  @media (max-width: 1680px) {
  // body{font-size: 28px;}
  }
  @media (max-width: 1920px) {
    // body{font-size: 33px;}
  }
}
</style>
