<template>
  <div class="home_container">
    <!-- 导航 -->
    <!-- 待处理和快捷入口 -->
    <processed-quick :list="dataList"></processed-quick>
    <!-- 销售额 -->
    <data-statistics :list="dataList"></data-statistics>
    <!-- 注册用户和订单 -->
    <reg-order :list="userOrderCountList"></reg-order>
    <!-- 商品 -->
    <product-user :list="dataList"></product-user>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProcessedQuick from './components/ProcessedQuick'
import DataStatistics from './components/DataStatistics'
import RegOrder from './components/RegOrder'
import ProductUser from './components/ProductUser'
// import { indexList, orderCount, userCount } from '@/api/home.js'
export default {
  name: 'Home',
  components: {
    ProcessedQuick,
    DataStatistics,
    RegOrder,
    ProductUser
  },
  data() {
    return {
      transformScale: '',
      dataList: {}, // 首页数据
      userOrderCountList: {
        userCountList: {}, // 首页用户统计
        orderCountList: {} // 首页订单统计
      },
      width: '',
      newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      }
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
    // 获取首页数据
    // this.indexListData()
    // 获取首页用户统计统计数据
    // this.userCountData()
    // 获取首页订单统计数据
    // this.orderCountData()
  },
  mounted() {
    // this.autoSetScale() // 进页面先执行一次页面高度和宽度计算然后赋值
    // window.addEventListener('resize', () => {
    //   this.autoSetScale()
    // }, false)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // 获取首页数据
    // indexListData() {
    //   indexList().then(res => {
    //     if (res.data && res.status === 200) {
    //       this.dataList = res.data
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 获取首页用户统计统计数据
    // userCountData() {
    //   userCount().then(res => {
    //     if (res.data && res.status === 200) {
    //       this.userOrderCountList.userCountList = res.data
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 获取首页订单统计数据
    // orderCountData() {
    //   orderCount().then(res => {
    //     if (res.data && res.status === 200) {
    //       this.userOrderCountList.orderCountList = res.data
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    autoSetScale() {
      const baseSize = 32
      // 当前页面宽度相对于 1080 宽的缩放比例，可根据自己需要修改。
      const scale = document.documentElement.clientWidth / 1920
      // 设置页面根节点字体大小
      document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
    },
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    }
  }
}
</script>
<style lang="scss" scoped>
.home_container{
  padding-top: 20.6px;
  padding-bottom: 20.6px;
  padding-left: 20px;
  padding-right: 20px;
  background: #F3F6F9;
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
}
</style>
