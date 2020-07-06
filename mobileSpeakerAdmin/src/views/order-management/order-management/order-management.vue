<template>
  <div class="platform_management">
    <el-card class="original_management_card">
      <div slot="header" class="original_management_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="2">
            <div class="original_management_header_list">
              <span>{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="1" :xl="1" class="add_btn">
            <div>
              <el-button type="primary" @click="openEditor(0, '')">添加</el-button>
            </div>
          </el-col> -->
        </el-row>
      </div>
      <div class="nav_title_content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">订单ID</span>
              <el-input v-model="searchData.id" class="pub_input_input" placeholder="请输入订单id" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">订单编号</span>
              <el-input v-model="searchData.orderNo" class="pub_input_input" placeholder="请输入订单编号" />
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">订单类型</span>
              <el-select v-model="searchData.order_type" class="pub_input_input" placeholder="请选择订单类型">
                <el-option v-for="item in orderTypeList" :key="item.order_type_id" :label="item.order_type_name" :value="item.order_type_id">
                </el-option>
              </el-select>
            </div>
          </el-col> -->
        </el-row>
        <el-row class="nav_top">
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <div class="pub_input_content">
              <span class="pub_input_title">订单状态</span>
              <el-select v-model="searchData.status" class="pub_input_input" placeholder="请选择订单类型">
                <el-option v-for="item in orderstatusList" :key="item.order_type_id" :label="item.order_type_name" :value="item.order_type_id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="8">
            <div class="pub_input_content">
              <span class="pub_input_title pub_input_title_data">下单时间</span>
              <el-date-picker
                v-model="searchData.start_time"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="pub_input_input pub_input_data"
                type="datetimerange"
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="3" :lg="3 " :xl="3" class="find_btn">
            <div>
              <el-button type="primary" @click="resetSearch">重置</el-button>  <el-button type="primary" @click="refreshTable">查找</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table_content">
        <el-tabs v-model="showType" class="tab_con" @tab-click="changeShowtype">
          <el-tab-pane label="全部订单" name="0">
            <order-table :datalist="tableData" @open-editor="openEditor"></order-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="待支付订单" name="1">
            <order-table :datalist="tableData" @open-editor="openEditor"></order-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="已支付订单" name="2">
            <order-table :datalist="tableData" @open-editor="openEditor"></order-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="支付超时" name="3">
            <order-table :datalist="tableData" @open-editor="openEditor"></order-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="取消订单" name="4">
            <order-table :datalist="tableData" @open-editor="openEditor"></order-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="支付失败" name="4">
            <order-table :datalist="tableData" @open-editor="openEditor"></order-table>
            <div v-if="page.total_page" class="pagination_body">
              <el-pagination background class="pagination" :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="page.total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import defaultSettings from '@/settings'
// import { orderList, expressList, orderDelivery, offlinePayDetail, examineOfflinePay } from '@/api/brandStoreOrderManagement.js'
import { orderList } from '@/api/orderManagement.js'
import OrderTable from './components/OrderTable'
import mixin from '@/utils/mixin'
export default {
  name: 'OrderManagement', // 订单管理
  components: {
    OrderTable
  },
  mixins: [mixin],
  data() {
    return {
      type: 0,
      loading: false,
      showType: '0',
      // 搜索内容
      searchData: {
        // product_type: '', // 商品类型 0全部订单，1预售订单
        // order_type: '',
        id: '', // 订单id
        status: '', // 订单的状态：1->未支付；2->已支付，3->支付超时，4->支付失败
        orderNo: '', // 订单号
        // tel: '', // 手机号
        start_time: '' // 下单时间 起始时间start_time[0] 收尾时间start_time[1]
        // delivery_no: '', // 物流单号
        // dataStr: '',
        // account_name: '' // 银行账户名
      },
      // 详情
      editorData: {
        order_id: ''
      },
      // // 订单类型
      // orderTypeList: [
      //   { order_type_id: '', order_type_name: '全部' },
      //   { order_type_id: 0, order_type_name: '预售订单' }
      // ],
      // 订单状态1 => '等待付款',2 => '等待配送',3 => '等待收货',4 => '订单完成',5 => '订单已取消',6 => '订单已关闭'
      orderstatusList: [
        { order_type_id: '', order_type_name: '全部' },
        { order_type_id: 1, order_type_name: '待支付' },
        { order_type_id: 2, order_type_name: '已支付' },
        { order_type_id: 3, order_type_name: '支付超时' },
        { order_type_id: 4, order_type_name: '支付失败' }
      ],
      // 表格数据
      tableData: [
        { id: 1, status: 1 }
      ],
      // 发货
      reFreshShowEditor: true,
      courierCompanyList: [],
      step_active: 0,
      listInfo: {},
      showEditor: false,
      openExpressInfo: {
        type: 0,
        id: '',
        order_id: '', // 订单id
        delivery_no: '', // 快递单号
        express_id: '', // 快递id
        is_logistics: '' // 配送方式
      },
      // 上传凭证
      // 图片放大
      viewImageUrl: '',
      showImg: false,
      reFreshshowImg: true,
      offline_status: 0, // 凭证审核状态：通过->3；拒绝->2 线下付款状态，0->等待上传凭证，1->审核中,2->已拒绝，3->审核通过
      offline_status_btn: 0,
      listRemittanceVoucher: {},
      stepRemittanceVoucher: 0,
      remittance_voucher_order_id: '',
      page: {
        currentPage: 1,
        pageSizes: [15, 30, 45, 50, 100],
        pageSize: 15,
        total: 20,
        total_page: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
    showEditor(val) {
      if (val) {
        this.reFreshShowEditor = true
        this.$nextTick(() => {
          this.reFreshShowEditor = true
        })
      } else {
        this.reFreshShowEditor = false
        this.$nextTick(() => {
          this.reFreshShowEditor = true
        })
      }
      this.$nextTick(() => {
        this.reFreshShowEditor = true
      })
    },
    showImg(val) {
      if (val) {
        this.reFreshshowImg = true
        this.$nextTick(() => {
          this.reFreshshowImg = true
        })
      } else {
        this.reFreshshowImg = false
        this.$nextTick(() => {
          this.reFreshshowImg = true
        })
      }
      this.$nextTick(() => {
        this.reFreshshowImg = true
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'order-detail') {
      const otherData = {
        showType: this.showType
      }
      this.saveSearchData(this.$route.name, this.searchData, this.page, otherData)
    } else {
      this.clearSearchData()
    }
    next()
  },
  created() {
    this.keyupSubmit()
    // 获取列表
    this.drawTable()

    // const page = this.$route.name
    // this.getSearchData(page).then(res => {
    //   // console.log(res)
    //   if (res.code === 200) {
    //     this.searchData = res.searchData
    //     this.page = res.pageData
    //     this.showType = res.otherData.showType
    //     // const other = res.otherData
    //     this.drawTable()
    //   } else {
    //     this.drawTable()
    //   }
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // 回车事件
    keyupSubmit() {
      document.onkeydown = e => {
        const _key = window.event.keyCode
        if (_key === 13) {
          this.refreshTable()
        }
      }
    },
    // 切换显示隐藏
    changeShowtype(tab, event) {
      switch (parseInt(this.showType)) {
        case 0:
          this.searchData.status = ''
          this.refreshTable()
          break
        case 1:
          this.searchData.status = 1
          this.refreshTable()
          break
        case 2:
          this.searchData.status = 2
          this.refreshTable()
          break
        case 3:
          this.searchData.status = 3
          this.refreshTable()
          break
        case 4:
          this.searchData.status = 4
          this.refreshTable()
          break
        default:
          this.searchData.status = ''
          this.refreshTable()
          break
      }
    },
    // 获取列表
    orderListData() {
      // 当时间选择器点击清空时,会将时间赋值为null,造成无法通过数组下标取值
      // 判断为null的时候就转换为一个二维数组
      let searchTime = ['', '']
      if (!this.searchData.start_time) {
        searchTime = ['', '']
      } else {
        searchTime = this.searchData.start_time
      }
      //   if (this.searchData.start_time !== null && this.searchData.start_time !== '') {
      //     const data = `${this.searchData.start_time[0]} - ${this.searchData.start_time[1]}`
      //     this.searchData.dataStr = data
      //   } else {
      //     this.searchData.dataStr = ''
      //   }
      //   const formData = new FormData()
      const jsonData = {
        id: this.searchData.id,
        orderNo: this.searchData.orderNo,
        status: this.searchData.status,
        start_time: searchTime[0], // 已转换,不会是null或undefined,放心食用
        end_time: searchTime[1],
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      orderList(jsonData).then(res => {
        if (res.data && res.code === 200) {
          this.tableData = res.data
          //   this.tableData = [{ id: 1001 }] // test
          // this.page.total = parseInt(this.page.pageSize) * parseInt(res.data.total_page)
          this.page.total_page = parseInt(res.total)
          // if (this.page.total_page < 2) {
          //   this.page.total = this.tableData.length
          // }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 打开编辑/添加
    openEditor(_type, _row) {
      if (_type === 0) {
        this.editorData.type = 0
        this.editorData.id = ''
      } else if (_type === 1) {
        this.editorData.type = 1
        this.editorData.id = _row.card_id
        this.editorData.card_id = _row.card_id
      } else {
        this.editorData.type = 2
        this.editorData.order_id = _row.order_id
        this.$router.push({
          name: 'order-detail',
          query: { id: _row.id }
        })
      }
      // this.showEditor = true
    },
    // 渲染表格
    drawTable() {
      this.orderListData()
    },
    // 刷新表格
    refreshTable() {
      this.page.currentPage = 1
      this.drawTable()
    },
    // 查找
    refreshTableS() {
      this.page.currentPage = 1
      // this.searchData.product_type = this.searchData.order_type
      // if (this.searchData.order_type === '') {
      //   this.showType = '0'
      // } else {
      //   this.showType = '1'
      // }
      this.drawTable()
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.drawTable()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.drawTable()
    },
    // 重置
    resetSearch() {
      this.showType = '0'
      this.searchData.id = ''
      this.searchData.orderNo = ''
      this.searchData.status = ''
      this.searchData.start_time = ''
      this.refreshTable()
    }
  }
}
</script>

<style lang="scss">
.platform_management {
    .original_management_card {
      .tab_con {
        padding-left: 20px;
        padding-right: 20px;
      }
      .el-card__header {
        padding: 8px 10px;
      }
      .el-card__body {
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 0px;
      }
      .add_btn {
        float: right;
      }
      .pagination_body {
        padding-top: 20px;
        text-align: right;
      }
    }
    .num_con {
      width: 180px;
    }
    .pub_input_input_phone .el-input__inner{
      padding-left: 5px;
    }
}
</style>
<style lang="scss" scoped>
.platform_management {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  // 搜索框样式
  .table_content {
    padding-top: 20px;
  }
  .nav_top {
    padding-top: 20px;
  }
  .nav_title_content {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .pub_input_content {
    width: 100%;
    overflow: hidden;
    padding-right: 16px;
  }
  .pub_input_title {
    // width: 30%;
    width: 75px;
    float: left;
    height: 40px;
    line-height: 40px;
  }
  .pub_input_input {
    width: 70%;
    float: left;
    height: 40px;
  }
  .pub_input_data {
    width: 80%
  }
  .pub_input_phone {
    width: 41%;
  }
  .pub_input_input_phone {
    width: 59%;
  }
  .pub_input_price_hr {
    float: left;
    width: 10%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .find_btn {
    float: right;
  }
  .original_management_header {
    // padding-top: 20px;
  }
  .original_management_header_list {
    height: 40px;
    line-height: 40px;
  }
  .header_list_title {
    padding-left: 15px;
  }
  // 公共样式价格
  .pub_price {
    font-size: 18px;
    color: red;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  .msg {
    font-size: 13px;
    color: #999999;
    margin: 0;
  }
  .editor_img {
    width: 70px;
    height: 70px;
  }
  .pub_input_phone {
    width: 41%;
  }
  .pub_input_input_phone {
    width: 59%;
  }
}
</style>
