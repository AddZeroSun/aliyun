<template>
  <div class="refund_detail_container">
    <el-card class="refund_detail_card">
      <div slot="header" class="refund_detail_header">
        <el-row>
          <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="back">
            <div class="refund_detail_header_list" @click="goBack">
              <i style="font-size:35px" class="el-icon-arrow-left"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <div class="refund_detail_header_list">
              <span class="header_title">{{ this.$route.meta.title }}</span>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="3" :lg="1" :xl="1" class="add_btn">
            <div>
              <el-button type="primary" @click="openDetail">修改</el-button>
            </div>
          </el-col> -->
        </el-row>
      </div>
      <div class="body">
        <el-container>
          <!-- 左侧内容 -->
          <el-main>
            <div class="step_con">
              <el-steps :active="step_active" simple>
                <el-step title="卖家申请退款"></el-step>
                <el-step title="品牌馆审核"></el-step>
                <el-step title="平台审核"></el-step>
                <el-step title="退款完毕"></el-step>
              </el-steps>
            </div>
            <!-- 退款时间 -->
            <div class="title_con_c refund_time_con">
              <el-row v-if="info.status !==3 && info.status !==4 ">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <span class="title_con_msg">请处理退款申请</span>
                  <svg class="svg-icon time_icon_img" aria-hidden="true">
                    <use xlink:href="#icon-time"></use>
                  </svg>
                  <span class="time_msg">{{ info.time }}</span>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <span class="title_con_msg">已处理</span>
                </el-col>
              </el-row>
            </div>
            <!-- 退款状态 -->
            <div class="refund_status_con">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                  <p class="refund_status_title">提示：</p>
                  <p class="refund_status_desc">品牌馆同意退款，</p>
                  <p class="refund_status_desc">平台同意，将直接退款给买家。</p>
                  <p class="refund_status_desc">如果拒绝，买家可与品牌馆重新协商。</p>
                </el-col>
              </el-row>
            </div>
            <!-- 退款详情 -->
            <el-row class="refund_detail content_t">
              <div class="body_content">
                <div class="title_con_c">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="3" :xl="3">
                      <span class="title_con_msg">退款信息</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="detail_con">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                    <el-form label-width="75px" label-position="left">
                      <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                          <el-form-item label="发起人" class="item_c">
                            <span>{{ info.phone }}{{ info.username }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                          <el-form-item label="退款单号" class="item_c">
                            <span>{{ info.refund_no }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                          <el-form-item label="订单单号" class="item_c">
                            <span>{{ info.order_sn }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                          <el-form-item label="退款金额" class="item_c">
                            <span style="color:red">￥{{ info.price }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                          <el-form-item label="实付金额" class="item_c">
                            <span>￥{{ info.pay_price }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <!-- 退款按钮 -->
            <div class="refund_btn_con">
              <div v-if="info.status === 2">
                <el-button type="primary" @click="sureRefund">同意退款</el-button>
                <el-button class="refund_btn" type="danger" @click="refusedRefund">拒绝</el-button>
              </div>
              <el-button v-if="info.status === 3" type="primary" disabled>已同意</el-button>
              <el-button v-if="info.status === 4" type="danger" disabled>已拒绝</el-button>
              <el-button v-if="info.status === 5" type="danger" disabled>已撤销</el-button>
            </div>
            <!-- 协商历史 -->
            <div class="negotiation_history">
              <div class="body_content">
                <div class="title_con_c">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="3" :xl="3">
                      <span class="title_con_msg">协商历史</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="neg_his_con">
                <div v-for="item in record" :key="item.id" class="neg_his_content">
                  <!-- 店铺操作员 -->
                  <div class="neg_his_list">
                    <div class="neg_his_list_l">
                      <img :src="item.shop_user_header" class="neg_his_img" alt="">
                    </div>
                    <div class="neg_his_list_r">
                      <div class="neg_his_list_r_con">
                        <div v-if="item.status !==5 && item.status !==6" class="neg_his_list_r_list">
                          <span class="neg_his_list_r_title">{{ item.shop_name }}：{{ item.shop_user_name }}</span>
                          <span class="neg_his_list_r_data">{{ item.create_time }}</span>
                        </div>
                        <div v-if="item.status ===6" class="neg_his_list_r_list">
                          <span class="neg_his_list_r_title">{{ item.shop_name }}：{{ item.shop_user_name }}</span>
                          <span class="neg_his_list_r_data">{{ item.create_time }}</span>
                        </div>
                        <!-- 发起了退款申请，原因： 买多了，不想要了。订单状态：待发货。金额：￥130 -->
                        <div v-if="item.status ===2" class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">{{ item.shop_name }}{{ item.status_text }}退款申请。退款金额：￥{{ item.price }}。</span></div>
                        <div v-if="item.status ===3" class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">{{ item.status_text }}退款申请，退款成功。退款金额：￥{{ item.price }}。</span></div>
                        <div v-if="item.status ===4" class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">{{ item.status_text }}退款申请，原因： {{ item.deny_reason }}。订单状态：{{ item.order_status }}。退款金额：￥{{ item.price }}。</span></div>
                        <div v-if="item.status ===5" class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">{{ item.status_text }}</span></div>
                        <div v-if="item.status ===6" class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">{{ item.status_text }}退款申请，原因： {{ item.deny_reason }}。订单状态：{{ item.order_status }}。退款金额：￥{{ item.price }}。</span></div>
                      </div>
                    </div>
                  </div>
                  <!-- 申请人 -->
                  <div class="neg_his_list">
                    <div class="neg_his_list_l">
                      <img :src="item.header" class="neg_his_img" alt="">
                    </div>
                    <div class="neg_his_list_r">
                      <div class="neg_his_list_r_con">
                        <div class="neg_his_list_r_list">
                          <span class="neg_his_list_r_title">{{ item.username }}</span>
                          <span class="neg_his_list_r_data">{{ item.create_time }}</span>
                        </div>
                        <!-- 发起了退款申请，原因： 买多了，不想要了。订单状态：待发货。金额：￥130 -->
                        <div class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">发起了退款申请，原因： {{ item.application_reason }}。订单状态：{{ item.order_status }}。退款金额：￥{{ item.price }}。</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
          <!-- 右侧内容 -->
          <el-aside width="350px">
            <!-- 标题 -->
            <div class="refund_r_title">
              <div class="body_content">
                <div class="title_con_c">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <span class="title_con_msg">退款详情</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <!-- 店铺 -->
            <div class="refund_r_shop">
              <div class="neg_his_list" style="border:0;">
                <div class="neg_his_list_l">
                  <img :src="detail.shop_logo" class="neg_his_img sh_img" alt="">
                </div>
                <div class="neg_his_list_r">
                  <div class="neg_his_list_r_con">
                    <div class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc">{{ detail.shop_name }}</span></div>
                    <div class="neg_his_list_r_list shop_name_con">
                      <svg class="svg-icon ren_icon_img" aria-hidden="true">
                        <use xlink:href="#icon-renzheng"></use>
                      </svg>
                      <span class="neg_his_list_r_title shop_name">官方认证</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 商品 -->
            <div class="refund_r_product">
              <div class="body_content">
                <div class="title_con_c" style="border:0;">
                  <el-row class="refund_r_product_title">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <span class="title_con_msg">课程({{ detail.length }})</span>
                      <el-button v-if="showProductBtn === 1" class="title_con_r" type="text" @click="openProduct">{{ product_text }}</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="neg_his_con">
                <div :class="{'refund_r_product_list':!showProduct}">
                  <div v-for="(item,index) in detail.product" :key="index" class="neg_his_list">
                    <div class="neg_his_list_l">
                      <img :src="item.product_sku_img" class="neg_his_img sh_img" alt="">
                    </div>
                    <div class="neg_his_list_r">
                      <div class="neg_his_list_r_con">
                        <div class="neg_his_list_r_list">
                          <span class="neg_his_list_r_title goods_r_con_msg">{{ item.goods_name }}</span>
                        <!-- <span class="neg_his_list_r_data">{{ item.property_name }}</span> -->
                        </div>
                        <div class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc g_msg">有效时间：{{ item.property_name }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-collapse-transition>
                  <div v-show="showProduct" class="refund_r_product_list">
                    <div v-for="(item,index) in detail.product_t" :key="index" class="neg_his_list">
                      <div class="neg_his_list_l">
                        <img :src="item.product_sku_img" class="neg_his_img" alt="">
                      </div>
                      <div class="neg_his_list_r">
                        <div class="neg_his_list_r_con">
                          <div class="neg_his_list_r_list">
                            <span class="neg_his_list_r_title goods_r_con_msg">{{ item.goods_name }}</span>
                            <!-- <span class="neg_his_list_r_data">{{ item.property_name }}</span> -->
                          </div>
                          <div class="neg_his_list_r_list neg_his_list_r_list_b"><span class="neg_his_list_desc g_msg">有效时间：{{ item.property_name }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-collapse-transition>
              </div>
            </div>
            <!-- 退款信息 -->
            <div class="refund_r_info">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                  <el-form label-width="75px" label-position="left">
                    <el-row>
                      <el-form-item label="买  家" class="item_c">
                        <span>{{ detail.phone }}</span>
                      </el-form-item>
                      <el-form-item label="订单编号" class="item_c">
                        <span>{{ detail.order_sn }}</span>
                      </el-form-item>
                      <el-form-item label="退款渠道" class="item_c">
                        <span v-if="detail.pay_type === 1">微信支付</span>
                        <span v-if="detail.pay_type === 2">支付宝支付</span>
                        <span v-if="detail.pay_type === 3">银行汇款</span>
                        <span v-if="detail.pay_type === 4">线下支付</span>
                        <span v-if="detail.pay_type === 5">分期付款</span>
                        <span v-if="detail.pay_type === 6">活动支付</span>
                        <span v-if="detail.pay_type === 7">余额支付</span>
                      </el-form-item>
                      <el-form-item label="交易流水" class="item_c">
                        <span>{{ detail.transaction_id }}</span>
                      </el-form-item>
                      <el-form-item label="下单时间" class="item_c">
                        <span>{{ detail.create_time }}</span>
                      </el-form-item>
                      <el-form-item label="订单总价" class="item_c">
                        <span>￥{{ detail.total_price }}</span>
                      </el-form-item>
                      <el-form-item label="总优惠额" class="item_c">
                        <span>￥{{ detail.discount_amount }}</span>
                      </el-form-item>
                      <el-form-item label="邮  费" class="item_c">
                        <span>￥{{ detail.freight_price }}</span>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </el-col>
              </el-row>
            </div>
            <!-- 退款订单信息 -->
            <div class="refund_r_order">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                  <el-form label-width="75px" label-position="left">
                    <el-row>
                      <el-form-item label="退款单号" class="item_c">
                        <span>{{ detail.refund_no }}</span>
                      </el-form-item>
                      <el-form-item label="申请时间" class="item_c">
                        <span>{{ detail.application_time }}</span>
                      </el-form-item>
                      <el-form-item label="退款金额" class="item_c">
                        <span>￥{{ detail.price }}</span>
                      </el-form-item>
                      <el-form-item label="退款原因" class="item_c">
                        <span>{{ detail.application_reason }}</span>
                      </el-form-item>
                      <!-- <el-form-item label="要求" class="item_c">
                        <span>￥{{ detail.discount_amount }}</span>
                      </el-form-item>
                      <el-form-item label="说明" class="item_c">
                        <span>￥{{ detail.discount_amount }}</span>
                      </el-form-item> -->
                    </el-row>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </el-aside>
        </el-container>
        <div class="div_con"></div>
        <div class="btn_con">
          <el-button class="sub_btn" type="primary" @click="back">关闭</el-button>
        </div>
      </div>
    </el-card>
    <!-- 同意弹窗 -->
    <el-dialog v-if="reFreshShowRefundSure" title="同意退款申请" :close-on-click-modal="false" append-to-body width="800px" :visible.sync="showRefundSure">
      <div v-if="refundSureType === 0" style="text-align:center;padding-top:149px;padding-bottom:149px;">
        <p style="color: #353535;font-size:14px;">是否同意该用户的退款申请？</p>
        <p style="font-size:13px;color:#999999;">(同意资金将原路返回)</p>
      </div>
      <div v-if="refundSureType === 1" style="text-align:center;padding-top:149px;padding-bottom:149px;">
        <p style="color:red;font-size:14px;">账户异常</p>
        <p style="font-size:13px;color:red;word-break: break-all;">({{ refundSureTypeMsg }})</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <div v-if="refundSureType === 0" style="text-algin:center;">
          <el-button @click="showRefundSure = false">取消</el-button>
          <el-button :loading="loading" type="primary" @click="sureRefundBtn">确定同意</el-button>
        </div>
        <div v-if="refundSureType === 1" style="text-algin:center;">
          <el-button @click="showRefundSure = false">关闭</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 拒绝弹窗 -->
    <el-dialog v-if="reFreshShowRefundRefused" title="拒绝退款申请" :close-on-click-modal="false" append-to-body width="800px" :visible.sync="showRefundRefused">
      <div class="reason_content">
        <el-form ref="refundRefusedForm" :model="refund_refused_data" :rules="refundRefusedRules">
          <el-form-item label="拒绝原因" :label-width="'120px'" prop="deny_type" class="reason_con reason_con_s">
            <el-select v-model="refund_refused_data.deny_type" style="width:100%;" placeholder="请选择拒绝原因">
              <el-option v-for="item in reasonList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拒绝说明" :label-width="'120px'" prop="reason" class="reason_con">
            <el-input
              v-model="refund_refused_data.reason"
              type="textarea"
              :rows="5"
              placeholder="请输入拒绝原因"
              :maxlength="50"
              show-word-limit
              @input="inputFocus"
            >
            </el-input>
            <span class="numberV" style="position: absolute; right: 10px;bottom: 34px;"> {{ txtVal }}/50</span>
            <div style="fost-size:12px;color:#999999;">为了用户更好的理解，拒绝说明尽量简单明了</div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div style="text-algin:center;">
          <el-button @click="showRefundRefused = false">取消</el-button>
          <el-button type="primary" :loading="loading" @click="sureOrderRefundDenyData">确定拒绝</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'
// import { refundOrderDetail, orderRefundPass, orderRefundDeny, checkOrderRefundAuth } from '@/api/refundManagement.js'
export default {
  name: 'RefundDetail', // 退款详情
  components: {
  },
  mixins: [mixin],
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      order_id: '',
      // 订单信息
      orderInfo: {
        pre_sale: 0, // 预售1，非预售0
        order_id: '', // 订单id
        order_sn: '' // 订单号
      },
      // 退款
      info: {
        id: '',
        order_sn: '', // 订单单号
        pay_price: '', // 实付金额
        phone: '', // 手机号
        price: '', // 退款金额
        refund_no: '', // 退款单号
        refund_status: 2,
        status: '',
        time: '', // 时间
        user_id: '',
        username: ''// 发起人姓名
      },
      // 协商
      record: [],
      // 详情
      detail: {
        application_reason: '', // 退款原因
        application_time: '', // 申请时间
        create_time: '', // 下单时间
        discount_amount: '', // 总优惠额
        freight_price: '', // 邮  费
        length: 0, // 商品数量
        order_sn: '', // 订单编号
        phone: '', // 买家电话号
        price: '', // 退款金额
        product: [], // 商品
        product_t: [], // 商品
        refund_no: '', // 退款单号
        shop_id: 0, // 店铺id
        shop_logo: '',
        transaction_id: '', // 平台交易号
        shop_name: '', // 店铺名字
        pay_type: '', // 退款渠道
        total_price: ''
      },
      step_active: 0, // 订单状态
      // 同意弹窗
      showRefundSure: false,
      refundSureType: 0,
      refundSureTypeMsg: '原因：账户余额不足，无法退款',
      reFreshShowRefundSure: true,
      order_refund_pass_data: {
        application_id: '',
        admin_id: ''
      },
      // 拒绝弹窗
      txtVal: 0,
      showRefundRefused: false,
      reFreshShowRefundRefused: true,
      refund_refused_data: {
        application_id: '', // 退款记录id
        admin_id: '', // 退款账户id
        deny_type: '',
        reason: ''// 原因
      },
      reasonList: [
        { id: 1, name: '退款金额异常' },
        { id: 2, name: '退款账户异常' },
        { id: 3, name: '商户请求追回' },
        { id: 4, name: '其他' }
      ],
      // 拒绝规则限制
      refundRefusedRules: {
        reason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { required: true, message: '请输入拒绝原因', trigger: 'change' }
        ],
        deny_type: [
          // { required: true, message: '请选择拒绝原因', trigger: 'blur' },
          { required: true, message: '请选择拒绝原因', trigger: 'change' }
        ]
      },
      showProductBtn: 0,
      product_text: '展开',
      showProduct: false
    }
  },
  computed: {
  },
  watch: {
    showRefundSure(val) {
      if (val) {
        this.reFreshShowRefundSure = true
        this.$nextTick(() => {
          this.reFreshShowRefundSure = true
        })
      } else {
        this.reFreshShowRefundSure = false
        this.$nextTick(() => {
          this.reFreshShowRefundSure = true
        })
      }
      this.$nextTick(() => {
        this.reFreshShowRefundSure = true
      })
    },
    showRefundRefused(val) {
      if (val) {
        this.reFreshShowRefundRefused = true
        this.$nextTick(() => {
          this.reFreshShowRefundRefused = true
        })
      } else {
        this.reFreshShowRefundRefused = false
        this.$nextTick(() => {
          this.reFreshShowRefundRefused = true
        })
      }
      this.$nextTick(() => {
        this.reFreshShowRefundRefused = true
      })
    }
  },
  created() {
    this.order_id = parseInt(this.$route.query.order_id)
    this.refundOrderDetailData(this.order_id)
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    goBack() {
      this.back()
    },
    openProduct() {
      if (!this.showProduct) {
        this.showProduct = true
        this.product_text = '收起'
      } else {
        this.product_text = '展开'
        this.showProduct = false
      }
    },
    // 同意退款
    sureRefund() {
      const _this = this
      this.order_refund_pass_data.application_id = this.info.id
      this.order_refund_pass_data.admin_id = localStorage.getItem('adminId')
      this.refundSureType = 0
      // this.showRefundSure = true
      this.checkOrderRefundAuthData(function(res) {
        if (res.data && res.status === 200) {
          _this.showRefundSure = true
        }
      })
    },
    // 同意退款接口
    orderRefundPassData() {
      // const _this = this
      // const formData = new FormData()
      // formData.append('application_id', this.order_refund_pass_data.application_id)
      // formData.append('admin_id', this.order_refund_pass_data.admin_id)
      // formData.append('sort', this.editorData.sort)
      // this.loading = true
      // orderRefundPass(formData).then(res => {
      //   if (res.data && res.status === 200) {
      //     this.refundSureType = 0
      //     // console.log(res)
      //     this.$message({
      //       message: res.message,
      //       type: 'success'
      //     })
      //     this.showRefundSure = false
      //     this.loading = false
      //     setTimeout(() => {
      //       _this.refundOrderDetailData(_this.order_id)
      //     }, 1000)
      //     // this.refreshTable()
      //   } else {
      //     this.refundSureType = 1
      //     this.refundSureTypeMsg = res.message
      //     this.loading = false
      //     this.$message({
      //       message: res.message,
      //       type: 'warning'
      //     })
      //   }
      // }).catch(err => {
      //   this.loading = false
      //   console.log(err)
      // })
    },
    // 确认同意
    sureRefundBtn() {
      this.orderRefundPassData()
    },
    // 拒绝退款
    inputFocus() {
      this.txtVal = this.refund_refused_data.reason.length
    },
    refusedRefund() {
      const _this = this
      this.txtVal = 0
      this.refund_refused_data.deny_type = ''
      this.refund_refused_data.reason = ''
      this.refund_refused_data.application_id = this.info.id
      this.refund_refused_data.admin_id = localStorage.getItem('adminId')
      // this.showRefundRefused = true
      this.checkOrderRefundAuthData(function(res) {
        if (res.data && res.status === 200) {
          _this.showRefundRefused = true
        }
      })
    },
    // 拒绝退款接口
    orderRefundDenyData() {
      // const _this = this
      // const formData = new FormData()
      // formData.append('application_id', this.refund_refused_data.application_id)
      // formData.append('admin_id', this.refund_refused_data.admin_id)
      // formData.append('deny_type', this.refund_refused_data.deny_type)
      // formData.append('reason', this.refund_refused_data.reason)
      // formData.append('sort', this.editorData.sort)
      // this.loading = true
      // orderRefundDeny(formData).then(res => {
      //   if (res.data && res.status === 200) {
      //     // console.log(res)
      //     this.$message({
      //       message: res.message,
      //       type: 'success'
      //     })
      //     this.showRefundRefused = false
      //     this.loading = false
      //     setTimeout(() => {
      //       _this.refundOrderDetailData(_this.order_id)
      //     }, 1000)
      //     // this.refreshTable()
      //   } else {
      //     this.loading = false
      //     this.$message({
      //       message: res.message,
      //       type: 'warning'
      //     })
      //   }
      // }).catch(err => {
      //   this.loading = false
      //   console.log(err)
      // })
    },
    sureOrderRefundDenyData() {
      this.$refs.refundRefusedForm.validate((valid) => {
        if (valid) {
          this.orderRefundDenyData()
        }
      })
    },
    // 查看订单详情
    refundOrderDetailData(_order_id) {
      // const _this = this
      // const data = {
      //   order_id: _order_id
      // }
      // refundOrderDetail(data).then(res => {
      //   if (res.data && res.status === 200) {
      //     // console.log(res)
      //     this.info.refund_status = parseInt(res.data.info.refund_status)
      //     this.info.id = res.data.info.id
      //     this.info.status = parseInt(res.data.info.status)
      //     if (this.info.status === 1) {
      //       this.step_active = 1
      //     } else if (this.info.status === 2) {
      //       this.step_active = 3
      //     } else {
      //       this.step_active = 4
      //     }
      //     this.info.time = res.data.info.time
      //     this.info.username = res.data.info.username
      //     this.info.phone = res.data.info.phone
      //     this.info.refund_no = res.data.info.refund_no
      //     this.info.order_sn = res.data.info.order_sn
      //     this.info.price = res.data.info.price
      //     this.info.pay_price = res.data.info.pay_price
      //     // 协商
      //     this.record = res.data.record
      //     // 退款信息
      //     this.detail.shop_logo = res.data.detail.shop_logo
      //     this.detail.shop_name = res.data.detail.shop_name
      //     // this.detail.product = res.data.detail.product
      //     const productArr = res.data.detail.product
      //     // console.log('productArr.length', productArr.length)
      //     if (productArr.length > 1 && productArr.length !== 2) {
      //       this.showProductBtn = 1
      //       for (let index = 0; index < productArr.length; index++) {
      //         // console.log(index)
      //         if (index < 2) {
      //           this.detail.product.push(productArr[index])
      //         } else {
      //           this.detail.product_t.push(productArr[index])
      //         }
      //       }
      //     } else {
      //       this.showProductBtn = 0
      //       this.detail.product = res.data.detail.product
      //     }
      //     this.detail.length = res.data.detail.length
      //     this.detail.phone = res.data.detail.phone
      //     this.detail.order_sn = res.data.detail.order_sn
      //     this.detail.create_time = res.data.detail.create_time
      //     this.detail.total_price = res.data.detail.total_price
      //     this.detail.discount_amount = res.data.detail.discount_amount
      //     this.detail.freight_price = res.data.detail.freight_price
      //     this.detail.refund_no = res.data.detail.refund_no
      //     this.detail.application_time = res.data.detail.application_time
      //     this.detail.price = res.data.detail.price
      //     this.detail.transaction_id = res.data.detail.transaction_id
      //     this.detail.pay_type = res.data.detail.pay_type
      //     this.detail.application_reason = res.data.detail.application_reason
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>
<style lang="scss">
.refund_detail_container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .refund_detail_card {
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
  .el-main {
    padding-top: 0px;
  }
}
.reason_con .el-form-item__content {
  margin-left: 44px!important;
}
.reason_content {
  padding-left: 120px;
  padding-right: 120px;
}
</style>
<style lang="scss" scoped>
.refund_detail_container {
  // 标题样式
  .refund_detail_header_list {
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
  // 标题
  .title_con_c {
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }
  .title_con_t {
    margin-top: 20px;
  }
  // 内容距离
  .content_t {
    padding-top: 20px;
  }
  // 底部按钮
  .div_con {
    height: 80px;
  }
  .btn_con {
    z-index: 2000;
    padding-top: 20px;
    padding-bottom: 20px;
    position: fixed;
    bottom: 0px;
    width: 86%;
    background: #ffffff;
    text-align: center;
  }
  .pre_st {
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: left;
    padding-left: 0;
  }
  // 退款时间
  .refund_time_con {
    padding-top: 20px;
  }
  .time_icon_img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    position: relative;
    top: 3px;
  }
  .time_msg {
    padding-left: 0px;
  }
  .refund_status_title {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  // 退款状态
  .refund_status_desc {
    color: #999999;
    font-size: 13px;
    margin: 0;
  }
  .item_c {
    margin-bottom: 0px;
  }
  // 退款按钮
  .refund_btn_con {
    padding-top: 20px
  }
  .refund_btn {
    margin-left: 10px;
  }
  // 协商历史
  .negotiation_history {
    padding-top: 20px
  }
  .neg_his_list {
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E8E8E8;
  }
  .neg_his_list_l {
    width: 70px;
  }
  .neg_his_img {
    width: 100%;
    // height: 100%;
    object-fit: fill;
    border-radius: 50%;
  }
  .neg_his_list_r {
    width: 100%;
    position: relative;
    padding-left: 10px;
  }
  .neg_his_list_r_con {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 10px;
  }
  .neg_his_list_r_list {
    overflow: hidden;
    // padding-top: 15px;
  }
  .neg_his_list_r_title {
    font-size: 13px;
  }
  .neg_his_list_r_data {
    float: right;
    color: #999999;
  }
  .neg_his_list_desc {
    font-size: 15px;
  }
  .neg_his_list_r_list_b {
    padding-top: 5px;
  }
  // 店铺
  .refund_r_shop {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }
  .ren_icon_img {
    width: 15px;
    height: 15px;
    // margin-left: 20px;
  }
  .shop_name {
    position: relative;
    top: -2px;
    font-size: 13px;
    color: #999999;
  }
  .shop_name_con {
    padding-top: 5px;
  }
  // 商品
  .refund_r_product {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }
  .refund_r_product_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .title_con_r {
    float: right;
    // padding-right: 10px;
  }
  // 信息
  .refund_r_info {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }
  // 退款订单
  .refund_r_order {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }
  .sh_img {
    border-radius: 0px;
  }
  .goods_r_con_msg {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .g_msg {
    font-size: 13px;
  }
  .refund_r_product_list .neg_his_list:last-child{
    border-bottom: 0px;
  }
  .neg_his_content .neg_his_list:last-child{
    border-bottom: 0px;
  }
}
</style>
