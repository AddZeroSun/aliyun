<template>
  <div class="processed_quick">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="processed_quick_con processed_quick_con_l">
          <div class="processed_quick_header">
            <svg class="svg-icon p_q_img" aria-hidden="true">
              <use xlink:href="#iconhome_"></use>
            </svg>
            <span class="p_q_title">待处理</span>
            <!-- <img class="p_q_img" src="../../../assets/home/home_1.png" alt=""><span class="p_q_title">待处理</span> -->
          </div>
          <div class="processed_quick_body">
            <el-row class="p_q_content">
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.offline_pay_num === 0}">{{ dataList.offline_pay_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">审核线下付款</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.wait_delivery_num === 0}">{{ dataList.wait_delivery_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">待发货订单</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="openMsg">
                  <div class="p_q_list_con">
                    <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.return_goods === 0}">{{ dataList.return_goods }}</span>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">退货订单</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="openMsg">
                  <div class="p_q_list_con">
                    <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.refund_order === 0}">{{ dataList.refund_order }}</span>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">退款订单</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="p_q_content_b">
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.real_num === 0}">{{ dataList.real_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">审核实名认证</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.customer_message === 0}">{{ dataList.customer_message }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">客服留言</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.promotion_expire_num === 0}">{{ dataList.promotion_expire_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">到期活动</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="p_q_list_con">
                  <span class="p_q_list_t" :class="{'p_q_list_t_b' : dataList.feedback_num === 0}">{{ dataList.feedback_num }}</span>
                </div>
                <div class="p_q_list_con p_q_list_con_b">
                  <span class="p_q_list_b">最新用户反馈</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="processed_quick_con processed_quick_con_r">
          <div class="processed_quick_header">
            <!-- <img class="p_q_img" src="../../../assets/home/home_2.png" alt=""><span class="p_q_title">待处理</span> -->
            <svg class="svg-icon p_q_img" aria-hidden="true">
              <use xlink:href="#iconhome_1"></use>
            </svg>
            <span class="p_q_title">快捷入口</span>
          </div>
          <div class="processed_quick_body">
            <el-row class="p_q_content">
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="open('system-management')">
                  <div class="p_q_list_con">
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__"></use>
                    </svg>
                  <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_1.png" alt=""> -->
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">系统管理</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="open('admin-management')">
                  <div class="p_q_list_con">
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__7"></use>
                    </svg>
                  <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_2.png" alt=""> -->
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">权限管理</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="open('order-management')">
                  <div class="p_q_list_con">
                    <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_3.png" alt=""> -->
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__5"></use>
                    </svg>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">订单管理</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="openMsg">
                  <div class="p_q_list_con">
                    <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_4.png" alt=""> -->
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#icon-home_2_4"></use>
                    </svg>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">内容专题</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="p_q_content_b">
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="open('course-management')">
                  <div class="p_q_list_con">
                    <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_5.png" alt=""> -->
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__2"></use>
                    </svg>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">课程管理</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="open('teacher-management')">
                  <div class="p_q_list_con">
                    <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_6.png" alt=""> -->
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__4"></use>
                    </svg>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">名师管理</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="openMsg">
                  <div class="p_q_list_con">
                    <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_7.png" alt=""> -->
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__3"></use>
                    </svg>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">业务报表</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="p_q_list">
                <div class="open_list" @click="openMsg">
                  <div class="p_q_list_con">
                    <!-- <img class="p_q_list_con_img" src="../../../assets/home/home_2_8.png" alt=""> -->
                    <svg class="svg-icon p_q_list_con_img" aria-hidden="true">
                      <use xlink:href="#iconhome__6"></use>
                    </svg>
                  </div>
                  <div class="p_q_list_con p_q_list_con_b">
                    <span class="p_q_list_b">商品专题</span>
                  </div>
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
// import { checkOrderRefundAuth } from '@/api/refundManagement.js'
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
        offline_pay_num: 0, // 审核线下付款数
        wait_delivery_num: 0, // 待发货订单数
        return_goods: 0, // 退货订单数
        refund_order: 0, // 退款订单数
        real_num: 0, // 审核实名认证数
        customer_message: 0, // 客服留言数
        promotion_expire_num: 0, // 活动到期数
        feedback_num: 0 // 最新用户反馈数
      }
    }
  },
  computed: {
  },
  watch: {
    list(val) {
      this.dataDetail = val
      this.dataList.offline_pay_num = this.dataDetail.offline_pay_num
      this.dataList.wait_delivery_num = this.dataDetail.wait_delivery_num
      this.dataList.return_goods = this.dataDetail.return_goods
      this.dataList.refund_order = this.dataDetail.refund_order
      this.dataList.real_num = this.dataDetail.real_num
      this.dataList.customer_message = this.dataDetail.customer_message
      this.dataList.promotion_expire_num = this.dataDetail.promotion_expire_num
      this.dataList.feedback_num = this.dataDetail.feedback_num
    }
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    open(_data) {
      this.$router.push({
        name: _data,
        query: { }
      })
    },
    openMsg() {
      // console.log(11111)
      this.$message({
        message: '功能暂缓开通',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.processed_quick {
  .processed_quick_con {
    // height: 240px;
    background: #ffffff;
  }
  .processed_quick_con_l {
    margin-right: 10px;
  }
  .processed_quick_con_r {
    margin-left: 10px;
  }
  .processed_quick_header {
    padding-top: calc(1.3 * 12px);
    padding-bottom: calc(1.3 * 12px);
    border-bottom: 1.5px solid #F9F9F9;
  }
  .processed_quick_body{
    height: calc(1.3 * 195px);
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
  .open_list:hover {
    cursor: pointer;
  }
  @media (max-width: 1024px){
  // body{font-size: 18px}
  } /*<=1024的设备*/
  @media (max-width: 1100px) {
  // body{font-size: 20px}
      .processed_quick_con_l {
      margin-right: 0px;
    }
    .processed_quick_con_r {
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
