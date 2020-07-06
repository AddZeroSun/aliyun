<template>
  <div class="platform_management_detail_container">
    <el-card class="platform_management_detail_card">
      <div slot="header" class="platform_management_detail_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="add_edit_theme_manager_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="platform_management_detail_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body">
        <!-- 品牌馆订单 -->
        <div class="body_content_list making_order">
          <order-con :list="listInfo" @change-detail="changeDetail"></order-con>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '@/utils/mixin'
// 品牌馆订单
import OrderCon from './components/OrderCon.vue'
import { orderDetail } from '@/api/orderManagement.js'
export default {
  name: 'OrderDetail', // 品牌馆订单
  components: {
    OrderCon
  },
  mixins: [mixin],
  data() {
    return {
      id: '', // 订单id
      pay_type: '', // 支付类型：1->微信支付，2->支付宝支付，3->银行汇款，4->线下支付，5->分期付款，6->活动支付，7->余额支付
      order_status: '', // 订单状态 1->新订单（等待付款）；2->已付款(等待配送)，3->已配送（等待收货），4->已收货（订单完成），5->订单已取消（用户取消或商家取消），6->订单已关闭（超时未支付或已退货完成等订单）
      product_type: '', // 订单类型 0->复合订单，1->版权商品，2->实物制作，3->原作商品，4->品牌馆订单
      listInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {},
  created() {
    this.id = parseInt(this.$route.query.id)
    this.order_status = parseInt(this.$route.query.order_status)
    this.product_type = parseInt(this.$route.query.product_type)
    this.pay_type = parseInt(this.$route.query.pay_type)
    this.orderDetailData(this.id)
  },
  mounted() {
  },
  destroyed() {},
  methods: {
    // 获取详情
    orderDetailData(_id) {
      const jsonData = {
        id: _id
      }
      orderDetail(jsonData).then(res => {
        if (res.data && res.code === 200) {
          this.listInfo = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeDetail(val) {
      this.orderDetailData(val)
    },
    goBack() {
      this.back()
    },
    // 编辑作品
    openDetail() {
      this.$router.push({
        name: 'edit-work-library',
        query: { id: this.id, type: 1 }
      })
    }
  }
}
</script>

<style lang="scss">
.platform_management_detail_container {
  .platform_management_detail_card {
    .el-card__header {
      padding: 8px 10px;
    }
    .el-card__body {
      padding-left: 0px;
      padding-right: 0px;
    }
    .add_btn {
      float: right;
    }
    .pagination_body {
      padding-top: 20px;
      text-align: right;
    }
  }
}
</style>
<style lang="scss" scoped>
.platform_management_detail_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  // 标题样式
  .platform_management_detail_header_list {
    height: 40px;
    line-height: 40px;
  }
  .header_title {
    padding-right: 10px;
  }
  .title_con {
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .title_con_msg {
    font-size: 20px;
  }
  // 内容
  .body_content_list {
    padding-left: 20px;
    padding-right: 20px;
  }
  .sub_btn {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
