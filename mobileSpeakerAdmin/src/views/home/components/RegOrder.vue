<template>
  <div class="reg_order">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="reg_order_con_r">
          <span class="reg_order_con_l_tab reg_order_con_l_tab_r">15日订单量</span>
          <bar-chart :list="orderCountList"></bar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="reg_order_con_l">
          <span class="reg_order_con_l_tab">七日注册量</span>
          <line-chart :chart-data="userCountList"></line-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './LineChart'
import BarChart from './BarChart'

export default {
  name: 'RegOrder',
  components: {
    LineChart,
    BarChart
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
      dataDetail: this.list,
      userCountList: {},
      orderCountList: {}
      // lineChartData: {
      //   expectedData: [100, 120, 161, 134, 105, 160, 165],
      //   actualData: [120, 82, 91, 154, 162, 140, 145]
      // }
    }
  },
  computed: {
  },
  watch: {
    list: {
      deep: true,
      handler(val) {
        this.dataDetail = val
        this.userCountList = this.dataDetail.userCountList
        this.orderCountList = this.dataDetail.orderCountList
      }
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
.reg_order {
  margin-top: calc(1.3 * 34px);
  .reg_order_con_l {
    width: 100%;
    background: #ffffff;
    padding-top: calc(1.3 * 20px);
    padding-right: 20px;
    padding-left: 20px;
    position: relative;
  }
  .reg_order_con_l_tab {
    position: absolute;
    top: calc(1.3 * -24px);
    left: calc(1.3 * 14px);
    display: inline-block;
    width: calc(1.3 * 96px);
    height: calc(1.3 * 34px);
    text-align: center;
    line-height: calc(1.3 * 34px);
    background: #6777EF;
    border-radius: 2px;
    color: #ffffff;
  }
  .reg_order_con_r {
    padding-top: calc(1.3 * 20px);
    // padding-bottom: calc(1.3 * 20px);
    position: relative;
    // margin-right: 10px;
    background: #ffffff;
  }
  .reg_order_con_l_tab_r {
    background: #0097FF;
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
