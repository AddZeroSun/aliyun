<template>
  <el-row class="orderCon_container">
    <div class="body_content">
      <div class="title_con">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="3" :xl="3">
            <span class="title_con_msg">订单编号：{{ orderInfo.orderNo }}</span>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="step_r">
            <div class="order_step_con">
              <el-steps :active="step_active" finish-status="success">
                <el-step title="待支付"></el-step>
                <el-step title="待发货"></el-step>
                <el-step title="待收货"></el-step>
                <el-step title="订单完成"></el-step>
              </el-steps>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>
    <!-- 详情 -->
    <div class="detail_con">
      <el-collapse v-model="collapseActive">
        <el-collapse-item title="基本信息" name="1">
          <el-card shadow="always">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                <el-form label-width="100px" class="demo-dataList">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="订单ID" class="item_c">
                        <span>{{ orderInfo.id }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="订单编号" class="item_c">
                        <span>{{ orderInfo.orderNo }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="另一个订单id" class="item_c">
                        <span>{{ orderInfo.orderId }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="订单状态" class="item_c">
                        <span>{{ orderInfo.status }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="下单时间" class="item_c">
                        <span>{{ orderInfo.add_time }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="规格" class="item_c">
                        <span>{{ orderInfo.desc }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="订单金额" class="item_c">
                        <span v-if="orderInfo.price !==''">￥{{ orderInfo.price }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="实付金额" class="item_c">
                        <span v-if="orderInfo.payPrice !==''">￥{{ orderInfo.payPrice }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="支付状态" class="item_c">
                        <span>{{ orderInfo.status_text }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="支付方式" class="item_c">
                        <span>{{ orderInfo.payment_text }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="支付编号" class="item_c">
                        <span>{{ orderInfo.payId }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="下单用户" class="item_c">
                        <span>{{ orderInfo.phone }}<span v-if="orderInfo.username !==''">({{ orderInfo.username }})</span>  ID:{{ orderInfo.user_id }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="下单渠道" class="item_c">
                        <span>{{ orderInfo.source }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="用户信息" name="2">
          <el-card shadow="always">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                <el-form label-width="100px" class="demo-dataList">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="头像" class="item_c">
                        <img class="demo_info_head" :src="orderInfo.user.headimgurl" alt="头像">
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="用户昵称" class="item_c">
                        <span>{{ orderInfo.user.nickename }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="性别" class="item_c">
                        <span>{{ orderInfo.user.sex }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="用户ID" class="item_c">
                        <span>{{ orderInfo.user.id }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="注册时间" class="item_c">
                        <span>{{ orderInfo.user.add_time }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="手机号" class="item_c">
                        <span>{{ orderInfo.user.phone }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="邮箱" class="item_c">
                        <span>{{ orderInfo.user.mail }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="地区" class="item_c">
                        <span v-if="orderInfo.user.country !== '' || orderInfo.user.province !== '' || orderInfo.user.city !== ''">
                          {{ orderInfo.user.country }} - {{ orderInfo.user.province }} - {{ orderInfo.user.city }}
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="openid" class="item_c">
                        <span>{{ orderInfo.user.openid }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="unionid" class="item_c">
                        <span>{{ orderInfo.user.unionid }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="白名单" class="item_c">
                        <span v-if="orderInfo.user.whiteList === true">是</span>
                        <span v-else>否</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="黑名单" class="item_c">
                        <span v-if="orderInfo.user.whiteList === true">是</span>
                        <span v-else>否</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="排名" class="item_c">
                        <span>{{ orderInfo.user.userNo }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="类型" class="item_c">
                        <span>{{ orderInfo.user.user_type }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="讲师信息" name="3">
          <el-card shadow="always">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                <el-form label-width="100px" class="demo-dataList">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="头像" class="item_c">
                        <img v-if="orderInfo.teacher.head !== ''" class="demo_info_head" :src="orderInfo.teacher.head" alt="头像">
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="讲师名称" class="item_c">
                        <span>{{ orderInfo.teacher.nickename }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="性别" class="item_c">
                        <span>{{ orderInfo.teacher.sex }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="讲师ID" class="item_c">
                        <span>{{ orderInfo.teacher.id }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="加入时间" class="item_c">
                        <span>{{ orderInfo.teacher.add_time }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="手机号" class="item_c">
                        <span>{{ orderInfo.teacher.phone }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="状态" class="item_c">
                        <span>{{ orderInfo.teacher.status }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="收藏数" class="item_c">
                        <span>{{ orderInfo.teacher.collect_num }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="排序" class="item_c">
                        <span>{{ orderInfo.teacher.sort }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="显示" class="item_c">
                        <span v-if="orderInfo.teacher.is_show === '1'">是</span>
                        <span v-else-if="orderInfo.teacher.is_show === '2'">否</span>
                        <span v-else></span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="推荐" class="item_c">
                        <span v-if="orderInfo.teacher.is_recommend === '1'">是</span>
                        <span v-else-if="orderInfo.teacher.is_recommend === '2'">否</span>
                        <span v-else></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="22" :sm="22" :md="18" :lg="14" :xl="14">
                      <el-form-item label="简介" class="item_c">
                        <span>
                          {{ orderInfo.teacher.info }}
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="课程" name="4">
          <el-card shadow="always">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                <el-form label-width="100px" class="demo-dataList">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="头像" class="item_c">
                        <img v-if="orderInfo.teacher.head !== ''" class="demo_info_head" :src="orderInfo.teacher.head" alt="头像">
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="讲师名称" class="item_c">
                        <span>{{ orderInfo.teacher.nickename }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="性别" class="item_c">
                        <span>{{ orderInfo.teacher.sex }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="讲师ID" class="item_c">
                        <span>{{ orderInfo.teacher.id }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="加入时间" class="item_c">
                        <span>{{ orderInfo.teacher.add_time }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="手机号" class="item_c">
                        <span>{{ orderInfo.teacher.phone }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="状态" class="item_c">
                        <span>{{ orderInfo.teacher.status }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="收藏数" class="item_c">
                        <span>{{ orderInfo.teacher.collect_num }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="排序" class="item_c">
                        <span>{{ orderInfo.teacher.sort }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="显示" class="item_c">
                        <span v-if="orderInfo.teacher.is_show === '1'">是</span>
                        <span v-else-if="orderInfo.teacher.is_show === '2'">否</span>
                        <span v-else></span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                      <el-form-item label="推荐" class="item_c">
                        <span v-if="orderInfo.teacher.is_recommend === '1'">是</span>
                        <span v-else-if="orderInfo.teacher.is_recommend === '2'">否</span>
                        <span v-else></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="22" :sm="22" :md="18" :lg="14" :xl="14">
                      <el-form-item label="简介" class="item_c">
                        <span>
                          {{ orderInfo.teacher.info }}
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-collapse-item>
      </el-collapse>

    </div>
    <!-- 课程信息 -->
    <div class="title_con_c title_con_t">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="3" :xl="3">
          <span class="title_con_msg">课程信息</span>
        </el-col>
      </el-row>
    </div>
    <div class="content_t product_info">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-table
            :data="coursesTable"
            border
            style="width: 100%"
          >
            <el-table-column align="center" property="id" width="80" label="课程ID" />
            <el-table-column align="center" label="封面图" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.image" min-width="80" height="80" />
              </template>
            </el-table-column>
            <el-table-column align="center" property="name" label="课程名称" />
            <el-table-column align="center" property="course_spe" label="课程规格" />
            <el-table-column align="center" property="chapter_number" label="章节数" />
            <el-table-column align="center" label="课程价格">
              <template slot-scope="">
                <div>
                  <p class="order_con total_price"><span>￥</span>{{ orderInfo.courses.price }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="学习人数">
              <template slot-scope="scope">
                <div>
                  <p class="order_con total_price">{{ scope.row.learn_num }}<span>人</span></p>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" property="collect_num" label="收藏数" />
            <el-table-column align="center" property="sort" width="80" label="排序" />
            <el-table-column align="center" label="是否显示">
              <template slot-scope="scope">
                <div>
                  <p v-if="scope.row.is_show === true">显示</p>
                  <p v-else>隐藏</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否推荐">
              <template slot-scope="scope">
                <div>
                  <p v-if="scope.row.is_recommend === true">推荐</p>
                  <p v-else>不推荐</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" property="add_time" width="180" label="添加时间" />
            <el-table-column align="center" property="status" label="状态">
              <template slot-scope="scope">
                <div>
                  <p v-if="scope.row.status === 1">正常</p>
                  <p v-else-if="scope.row.status === 2">异常</p>
                  <p v-else>未知</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 合计 -->
    <div class="title_con_c title_con_t" style="border-bottom:0;">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="combined_con">
            <span v-if="orderInfo.courses !== '' && orderInfo.courses.length !== 0" class="title_con_msg combined_all">课程总金额：￥{{ orderInfo.price }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="div_con"></div>
    <div class="btn_con">
      <el-button class="sub_btn" type="primary" @click="back">关闭</el-button>
    </div>
  </el-row>
</template>

<script>
import mixin from '@/utils/mixin'
// import { expressList, orderDelivery, orderDeliveryDetail, editOrderDelivery } from '@/api/platformManagement.js'
export default {
  name: 'OrderCon', // 订单
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
      // 图片放大
      viewImageUrl: '',
      showImg: false,
      reFreshShowEditor: true,
      listInfo: {},
      showEditor: false,
      editorData: {
        type: 0
      },
      collapseActive: ['0'],
      dataDetail: this.list,
      // 订单信息
      // orderInfo: {
      //   pre_sale: 0, // 预售1，非预售0
      //   id: '', // 订单id
      //   orderNo: '', // 订单号
      //   product_type_text: '', // 订单类型
      //   order_status_text: '', // 订单状态
      //   cancel_reason: '', // 原因
      //   user_id: '', // 用户id
      //   phone: '', // 用户手机号
      //   username: '', // 用户名
      //   pay_time: '', // 支付时间
      //   pay_type_text: '', // 支付方式
      //   transaction_id: '', // 交易号
      //   deliver_time: '', // 发货时间
      //   create_time: '', // 下单时间
      //   source: '', // 下单渠道
      //   confirm_receipt_time: '', // 订单确认时间
      //   shop_name: '', // 卖家
      //   freight_price: '', // 运费
      //   discount_amount: '', // 优惠金额
      //   total_price: '', // 商品总金额
      //   pay_price: '', // 实际支付金额
      //   order_note: '', // 订单备注
      //   order_status: '' // // 订单的状态：1->新订单（等待付款）；2->已付款(等待配送)，3->已配送（等待收货），4->已收货（订单完成），5->订单已取消（用户取消或商家取消），6->订单已关闭（超时未支付或已退货完成等订单
      // },
      orderInfo: {
        // 基本信息
        id: '', // 订单id
        orderNo: '', // 订单编号
        orderId: '', // 订单id（存疑）
        payId: '', // 支付id
        desc: '', // 规格
        price: '', // 订单金额
        payPrice: '', // 实付金额
        status: '', // 订单状态
        status_text: '', // 订单状态-文本
        payStatus: '', // 支付状态
        pay_status_text: '', // 支付状态-文本
        payment: '', // 支付方式
        payment_text: '', // 支付方式-文本
        add_time: '', // 下单时间
        // 用户信息
        user: {
          id: '', // 用户id
          openid: '', // 微信openid
          nickname: '', // 昵称
          accessToken: '', // token
          sex: '', // 性别
          province: '', // 省
          city: '', // 市
          country: '', // 国家/地区
          headimgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3407686795,968933150&fm=26&gp=0.jpg', // 头像
          privilege: '', // 优惠
          unionid: '', // 小程序关联公众号
          userNo: '', // 用户编号
          phone: '', // 手机号
          mail: '', // 邮箱
          cardType: '', //
          cardName: '', //
          cardNumber: '', //
          whiteList: '', // 白名单 true or false
          BlockList: '', // 给名单 true or false
          add_time: '', // 注册时间
          user_type: '' // 用户类型

        },
        // 讲师信息
        teacher: {
          id: '', // 讲师id
          head: '', // 头像
          name: '', // 名称
          sex: '', // 性别
          phone: '', // 手机号
          is_show: '', // 是否显示
          is_recommend: '', // 是否推荐
          add_time: '', // 添加时间
          status: '', // 状态
          collect_num: '', // 收藏数
          sort: '', // 排序
          info: '' // 简介
        },
        // 课程信息
        courses: {
          id: '', // 课程id
          image: '', // 封面图
          name: '', // 课程名称
          teacher_id: '', // 讲师id
          course_spe: '', // 课程规格
          chapter_number: '', // 章节数
          price: '', // 价格
          learn_num: '', // 学习人数
          collect_num: '', // 收藏数
          is_show: '', // 是否显示
          is_recommend: '', // 是否推荐
          add_time: '', // 添加时间
          sort: '', // 排序
          status: '' // 状态
        }
      },
      coursesTable: [],
      step_active: 0, // 订单状态
      expressInfo: [], // 发货信息
      // 快递公司
      courierCompanyList: [],
      // 发货信息
      openExpressInfo: {
        type: 0,
        id: '', // 订单id
        delivery_no: '', // 快递单号
        express_id: '', // 快递id
        is_logistics: '' // 配送方式
      },
      // 分佣信息
      commissionInfo: [],
      // 制作证书
      makeCertInfo: {
        id: '', // 订单id
        copy_code: '', // 溯源码
        full_name: '' // 持有人
      },
      goodsInfo: [], // 商品信息
      // 证书
      serial_type: 0,
      certificateInfo: [], // 证书信息
      certificate_name: '', // 证书名称
      // 商品小计
      totalInfo: {
        discount_amount: '', // 优惠
        freight_price: '', // 运费
        total_price: '',
        pay_price: '' // 合计
      }
    }
  },
  computed: {
  },
  watch: {
    list(val) {
      // console.log(val, 'val')
      // 订单信息
      this.dataDetail = val
      this.orderInfo = val
      this.coursesTable[0] = val.courses
      // 订单的状态：1->新订单（等待付款）；2->已付款(等待配送)，3->已配送（等待收货），4->已收货（订单完成），5->订单已取消（用户取消或商家取消），6->订单已关闭（超时未支付或已退货完成等订单
      if (parseInt(this.orderInfo.order_status) === 1) {
        this.step_active = 1
      } else if (parseInt(this.orderInfo.order_status) === 2) {
        this.step_active = 2
      } else if (parseInt(this.orderInfo.order_status) === 3) {
        this.step_active = 3
      } else if (parseInt(this.orderInfo.order_status) === 4) {
        this.step_active = 4
      } else {
        this.step_active = 4
      }
      // 发货信息
      this.expressInfo = val.expressInfo
      this.openExpressInfo.is_logistics = val.expressInfo[0].is_logistics
      // 商品信息
      this.goodsInfo = val.goodsInfo
      // //  证书
      // this.certificateInfo = val.certificateInfo
      // 合计
      this.totalInfo.discount_amount = val.totalInfo.discount_amount
      this.totalInfo.freight_price = val.totalInfo.freight_price
      this.totalInfo.total_price = val.totalInfo.total_price
      this.totalInfo.pay_price = val.totalInfo.pay_price
      // 分佣信息
      this.commissionInfo = val.commissionInfo
    },
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
    }
  },
  created() {
    // console.log('版权')
    // this.expressListData()
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // 查看订单详情
    orderDeliveryDetailData(_id, _order_id) {
      // const _this = this
      // const data = {
      //   id: _id,
      //   id: _order_id
      // }
      // orderDeliveryDetail(data).then(res => {
      //   if (res.data && res.status === 200) {
      //     setTimeout(() => {
      //       _this.listInfo = res.data
      //     }, 1000)
      //     this.showEditor = true
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>
<style lang="scss">
.el-badge__content.is-fixed {
  top: 9px;
  right: 71px;
}
.orderCon_container {
    .item_c .el-form-item {
      margin-bottom: 0;
    }
    .el-collapse-item__header {
      font-size: 16px;
    }
}
</style>
<style lang="scss" scoped>
.orderCon_container {
  // 标题
  .title_con {
    height: 30px;
    // border-bottom: 1px solid #999999;
  }
  .title_con_c {
    padding-bottom: 20px;
    border-bottom: 1px solid #999999;
  }
  .title_con_t {
    margin-top: 20px;
  }
  .step_r {
    float: right;
  }
  .order_step_con {
    height: 50px;
    position: relative;
    top: 18px;
    // line-height: 50px;
  }
  // 信息展示
  .detail_con {
    // margin-top: 80px; // 如果有step步骤条则需要加上
    .demo_info_head {
      width: 80px;
    }
  }
  // 内容距离
  .content_t {
    padding-top: 20px;
  }
  // 发货
  .delivery_info {
    padding-top: 20px;
  }
  .delivery_info_con {
    text-align: left;
  }
  .product_con_title_r {
    display: inline-block;
    width: 180px;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    padding-left: 15px;
    vertical-align: text-bottom;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .product_con_title {
    width: 180px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    float: right;
  }
  .logis_con {
    position: relative;
  }
  .edit_btn{
    font-size: 25px;
    font-size: 25px;
    height: 50px;
    line-height: 50px;
    // float: right;
    margin-right: 10px;
    position: absolute;
    right: 0;
    top: 0px;
  }
  .logis_list_con {
    margin: 0;
    text-align: left;
    padding-left: 10px;
  }
  // 合计
  .combined_con {
    float: right;
    text-align: right;
  }
  .combined_all {
    font-size: 20px;
    color: red;
  }
  .combined_l {
    margin-right: 20px;
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
}
</style>
