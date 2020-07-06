<template>
  <div class="components_container">
    <el-table
      ref="OriginalManagementTable"
      border
      :data="dataCon"
      highlight-current-row
    >
      <el-table-column align="center" property="id" width="80" label="ID" />
      <el-table-column align="center" property="orderNo" label="订单编号" />
      <el-table-column align="center" property="orderId" width="80" label="订单ID" />
      <el-table-column align="center" property="payId" label="支付id" />
      <el-table-column align="center" property="courses_name" label="课程名称" />
      <el-table-column align="center" property="desc" label="课程规格" />
      <el-table-column align="center" property="teacher_name" :resizable="false" label="名师" />
      <el-table-column align="center" width="150px" label="￥订单金额">
        <template slot-scope="scope">
          <div>
            <p class="order_con total_price"><span>￥</span>{{ scope.row.price }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="￥实付金额" width="150px">
        <template slot-scope="scope">
          <div>
            <p class="order_con total_price"><span>￥</span>{{ scope.row.payPrice }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.pid !== 1">
            <span v-if="scope.row.payStatus === 3 || scope.row.order_status === 4" style="color:red;">{{ scope.row.pay_status_text }}</span>
            <span v-else>{{ scope.row.pay_status_text }}</span>
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column align="center" property="pay_status_text" label="支付方式" />
      <el-table-column align="center" property="nickname" label="用户昵称" />
      <el-table-column align="center" property="phone" width="120" label="手机号" />
      <el-table-column align="center" property="add_time" width="160" show-overflow-tooltip label="下单时间" />
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openEditor(2, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'OrderTable',
  components: {
  },
  props: {
    datalist: {
      type: Array,
      default: function() {
        return []
      }
    },
    statuslist: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dataCon: this.dataList,
      statusList: this.statuslist
    }
  },
  watch: {
    datalist(val) {
      this.dataCon = val
    },
    statuslist(val) {
      this.statusList = val
    }

  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 打开编辑
    openEditor(_type, _row) {
      this.$emit('open-editor', _type, _row)
    }
  }
}
</script>
<style lang="scss">
.components_container {
  .row_a {
    visibility: hidden;
  }
  .el-table__expanded-cell{
    padding-top: 20px!important;
    padding-bottom: 20px!important;
    padding-left: 10px!important;
    padding-right: 10px!important;
  }
  .hiderow .el-table__expand-column .el-icon {
    visibility: hidden;
  }
  .el-badge__content.is-fixed {
    top: 9px;
    right: 71px;
  }
}
</style>
<style lang="scss" scoped>
.components_container{
  .pub_price_w {
    font-size: 18px;
    color: red;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
    color: #303133;
  }
  .pub_r {
    color: #303133;
    text-decoration: line-through;
  }
  .pub_m_n {
    font-size: 18px;
    color: #303133;
  }
  .pub_r_n {
    font-size: 18px;
  }
  // 商品
  .product_con {
    text-align: left;
    padding-left: 20px;
    overflow: hidden;
  }
  .img_con{}
  .product_con_title_r {
    width: 180px;
    height: 70px;
    line-height: 70px;
    font-size: 15px;
    vertical-align: text-bottom;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    float: right;
  }
  .product_con_title {
    width: 180px;
    overflow : hidden;
    float: right;
  }
  // 订单金额
  .order_con {
  }
  .total_price {
    margin: 0;
    font-size: 15px;
  }
  .freight_price {
    margin: 0;
    font-size: 12px;
    color: #999999;
  }
  .discount_amount {
    margin: 0;
    font-size: 12px;
    color: red;
  }
  .pre_st {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .goods_list_con {
    display: flex;
  }
  .goods_l_con {
    width: 70px;
  }
  .goods_r_con {
    padding-left: 10px;
  }
  .goods_r_con_msg {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
