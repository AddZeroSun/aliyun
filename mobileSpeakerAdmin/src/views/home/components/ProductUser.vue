<template>
  <div class="product_user">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="product_user_con product_user_con_l">
          <div class="product_user_header">
            <svg class="svg-icon p_q_img" aria-hidden="true">
              <use xlink:href="#iconhome_2"></use>
            </svg>
            <span class="p_q_title">商品总览</span>
            <!-- <p class="look_con"><span class="look_all">查看全部</span><span class="look_next">></span></p> -->
            <!-- <img class="p_q_img" src="../../../assets/home/home_7.png" alt=""><span class="p_q_title">商品总览</span> -->
          </div>
          <div class="product_user_body">
            <el-row class="p_q_content">
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.un_sale_num === 0}">{{ dataList.un_sale_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">已下架</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.sale_num === 0}">{{ dataList.sale_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">已上架</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.stock_num === 0}">{{ dataList.stock_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">库存紧张</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.product_num === 0}">{{ dataList.product_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">全部商品</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="product_user_con product_user_con_r">
          <div class="product_user_header">
            <!-- <img class="p_q_img" src="../../../assets/home/home_8.png" alt=""><span class="p_q_title">用户总览</span> -->
            <svg class="svg-icon p_q_img" aria-hidden="true">
              <use xlink:href="#iconhome_3"></use>
            </svg>
            <span class="p_q_title">用户总览</span>
            <!-- <p class="look_con"><span class="look_all">查看全部</span><span class="look_next">></span></p> -->
          </div>
          <div class="product_user_body">
            <el-row class="p_q_content">
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.month_num === 0}">{{ dataList.month_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">当月新增</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.quarter_num === 0}">{{ dataList.quarter_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">季度新增</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.halt_num === 0}">{{ dataList.halt_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">半年新增</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.user_num === 0}">{{ dataList.user_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">用户总数</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import CountTo from 'vue-count-to'

export default {
  name: 'ProcessedQuick',
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
        un_sale_num: 0, // 已下架
        sale_num: 0, // 已上架
        stock_num: 0, // 库存紧张
        product_num: 0, // 全部商品
        month_num: 0, // 本月新增
        quarter_num: 0, // 本季新增
        halt_num: 0, // 半年新增
        user_num: 0 // 用户总数
      }
    }
  },
  computed: {
  },
  watch: {
    list(val) {
      this.dataDetail = val
      this.dataList.un_sale_num = this.dataDetail.un_sale_num
      this.dataList.sale_num = this.dataDetail.sale_num
      this.dataList.stock_num = this.dataDetail.stock_num
      this.dataList.product_num = this.dataDetail.product_num
      this.dataList.month_num = this.dataDetail.month_num
      this.dataList.quarter_num = this.dataDetail.quarter_num
      this.dataList.halt_num = this.dataDetail.halt_num
      this.dataList.user_num = this.dataDetail.user_num
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
.product_user {
  margin-top:calc(1.3 * 20px);
  .product_user_con {
    // height: 240px;
    background: #ffffff;
  }
  .product_user_con_l {
    margin-right: 10px;
  }
  .product_user_con_r {
    margin-left: 10px;
  }
  .product_user_header {
    padding-top: calc(1.3 * 12px);
    padding-bottom: calc(1.3 * 12px);
    border-bottom: 1.5px solid #F9F9F9;
  }
  .product_user_body{
    // height: calc(1.3 * 195px);
    padding-top: calc(1.3 * 22px);
    padding-bottom: calc(1.3 * 22px);
  }
  // 左边
  .p_q_title {
    padding-left: calc(1.3 * 9px);
    // font-size: calc(1.1 * 19px);
    font-size: 16px;
    color: #6777EF;
    font-weight: bold;
    vertical-align: top;
    position: relative;
    top: 2px;
  }
  .look_con {
    float: right;
    margin-top: 0;
    margin-bottom: 0;
    padding-right: calc(1.1 * 20px);
    // padding-top: 8px;
  }
  .look_all {
    font-size: calc(1.1 * 19px);
    color: #6777EF;
  }
  .look_next {
    color: #C1C1C1;
    font-size: calc(1.1 * 16px);
    padding-left: 10px;
  }
  .p_q_img {
    margin-left: calc(1.3 * 20px);
    // width: calc(1.3 * 16px);
    width: 20px;
    // height: calc(1.3 * 18px);
    height: 20px;
  }
  .p_q_list {
    height: 57px;
    text-align: center;
  }
  .p_q_list_con_b {
    padding-top: calc(1.3 * 8px);
  }
  .p_q_list_t {
    font-size: calc(1.3 * 20px);
    color: #FF3E3E;
    text-align: center;
  }
  .p_q_list_b {
    font-size: calc(1.3 * 12px);
    color: #666666;
  }
  .p_q_list_t_b {
    color: rgba(0,0,0,0.85);
  }
  .p_q_content_b {
    padding-top: calc(1.3 * 51px);
  }
  // 右边
  .p_q_list_con_img {
    width: calc(1.3 * 19px);
    height: calc(1.3 * 21.3px);
  }
  @media (max-width: 1024px){
  // body{font-size: 18px}
  } /*<=1024的设备*/
  @media (max-width: 1100px) {
  // body{font-size: 20px}
      .product_user_con_l {
      margin-right: 0px;
    }
    .product_user_con_r {
      margin-left: 0px;
    }
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
