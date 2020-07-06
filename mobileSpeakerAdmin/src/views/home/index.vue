<template>
  <div class="home_container">
    <!-- 导航 -->
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <div class="nav_header">
      <el-row :gutter="20" class="nav_header_content">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="nav_header_list">
          <div class="nav_header_list_card nav_list_o">
            <img class="nav_header_icon" src="../../assets/icon_1.png" alt=""><span class="nav_header_text nav_header_text_msg">今日订单</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="nav_header_list">
          <div class="nav_header_list_card nav_list_d">
            <img class="nav_header_icon" src="../../assets/icon_2.png" alt=""><span class="nav_header_text nav_header_text_msg">今日销售总额</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="nav_header_list">
          <div class="nav_header_list_card nav_list_y">
            <img class="nav_header_icon" src="../../assets/icon_4.png" alt=""><span class="nav_header_text nav_header_text_msg">昨日销售总额</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="nav_header_list">
          <div class="nav_header_list_card nav_list_s">
            <img class="nav_header_icon" src="../../assets/icon_3.png" alt=""><span class="nav_header_text nav_header_text_msg">七日销售总额</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 待处理 -->
    <div class="processed pub_container">
      <div class="pub_header">
        <span class="pub_header_title">待处理</span>
      </div>
      <div class="pub_body">
        <el-row class="processed_body">
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text ">待付款订单</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">待发货订单</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">待审核实名认证</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">待处理客服留言</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="processed_body processed_body_footer">
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">待处理退货订单</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">待处理退款订单</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">到期活动</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="processed_list">
            <div class="pub_card pub_card_d">
              <span class="nav_header_text">最新用户反馈</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 快捷入口 -->
    <div class="quick_entry pub_container">
      <div class="pub_header">
        <span class="pub_header_title">快捷入口</span>
      </div>
      <div class="pub_body">
        <el-row class="processed_body">
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">添加作品IP</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">订单列表</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">用户管理</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">商品管理</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">推送管理</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">推荐管理</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="quick_entry_list">
            <div class="pub_card pub_card_k">
              <span class="nav_header_text">专题管理</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 商品总览 -->
    <div class="home_product pub_container">
      <div class="pub_header">
        <span class="pub_header_title">商品总览</span>
      </div>
      <div class="pub_body">
        <el-row class="processed_body">
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_p">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_6.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">已下架</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_p">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_5.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">已上架</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_p">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_7.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">库存紧张</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_p">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_8.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">全部商品</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 用户总览 -->
    <div class="home_product pub_container">
      <div class="pub_header">
        <span class="pub_header_title">用户总览</span>
      </div>
      <div class="pub_body">
        <el-row class="processed_body">
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_u">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_9.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">今日新增</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_u">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_11.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">昨日新增</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_u">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_12.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">本月新增</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="3" class="home_product_list">
            <div class="pub_card home_product_card pub_card_u">
              <el-row class="nav_row">
                <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="nav_icon_c">
                  <img class="nav_icon" src="../../assets/icon_13.png" alt="">
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="13" :xl="12" class="nav_icon_r">
                  <p class="home_product_text">200</p>
                  <p class="home_product_text">会员总数</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PanelGroup from './components/PanelGroup'

export default {
  // name: 'home',
  components: {
    // PanelGroup
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home_container{
  // 公用布局
  .pub_container {
    // margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
  }
  .pub_header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .pub_header_title {
    font-size: 20px;
  }
  .pub_card {
    width: 100%;
    height: 111px;
    line-height: 111px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #303133;
    text-align: center;
  }
  .nav_header_icon {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 15%;
    transform: translateY(-50%);
  }
  // &-container {
  //   margin: 30px;
  // }
  // &-text {
  //   font-size: 30px;
  //   line-height: 46px;
  // }
  // 导航
  .nav_header {
    // height: 111px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .nav_header_content {
    height: 100%;
  }
  .nav_header_list {
    height: 100%;
    // padding-left: 0px!important;
    // padding-right: 15px!important;
  }
  .nav_header_list_card {
    width: 100%;
    height: 135px;
    line-height: 135px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #303133;
    // text-align: center;
    position: relative;
  }
  // 待处理
  .processed {
  }
  .processed_list {
    padding-right: 15px;
  }
  .processed_body_footer {
    padding-top: 20px;
  }
  // 快捷入口
  .quick_entry {
  }
  .quick_entry_list {
    padding-right: 15px;
  }
  // 商品总览
  .home_product {
  }
  .home_product_list {
    padding-right: 15px;
  }
  .home_product_card {
    line-height: 0px;
  }
  .home_product_text {
    padding-top: 20px;
    color: #ffffff;
  }
  // 用户总览
  .home_user {
  }
  .home_user_list {
    padding-right: 15px;
  }
  .home_user_card {
    line-height: 0px;
  }
  .home_user_text {
    padding-top: 20px;
  }
  .nav_list_o {
    background-color: #1b7fbd;
  }
  .nav_list_d {
    background-color: #00c3bf;
  }
  .nav_list_y {
    background-color: #f18c8e;
  }
  .nav_list_s {
    background-color: #ffba07;
  }
  .pub_card_d {
    background-color: #27a9e3;
  }
  .pub_card_k {
    background-color: #28b779;
  }
  .pub_card_p {
    background-color: #ffb748;
  }
  .pub_card_u {
    background-color: #da552a;
  }
  .nav_header_text {
     color: #ffffff;
  }
  .nav_header_text_msg {
    position: absolute;
    left: 45%;
    color: #ffffff;
  }
  .nav_row {
    height: 100%;
  }
  .nav_icon_c {
    // position: relative;
    position: absolute;
    top: 50%;
    left: 7%;
    transform: translateY(-50%)
  }
  .nav_icon_r {
    float: right;
    margin-right: 12%;
    // transform: translateY(-50%)
  }
  .nav_icon {
    width: 40px;
    height: 40px;
    // position: absolute;
    // top: 50%;
    // left: 20%;
    // transform: translateY(-50%)
  }
}
</style>
