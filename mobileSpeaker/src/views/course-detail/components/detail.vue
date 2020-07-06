<template>
  <div class="components_container">
    <div class="contents">
      <!-- 标题 -->
      <div class="detail_title_con">
        <p class="detail_title">
          <span class="detail_title_msg">国学</span>
        </p>
         <div class="content_list_con">
            <span class="content_list_price">300￥</span>
            <span class="content_list_c content_list_m">|</span>
            <span class="content_list_c">32节</span>
            <span class="content_list_c content_list_z">令狐</span>
          </div>
      </div>
      <!-- 内容 -->
      <div class="title_con">
        <van-icon name="column" class="icon_de" />
        <span class="title">课程介绍</span>
      </div>
      <div class="content_detail">
        <p>介绍</p>
        <img width="100%" src="@/assets/images/vip_bg.png"/>
      </div>
      <!-- 名师介绍 -->
      <div class="title_con title_con_t">
        <van-icon name="manager" class="icon_de" />
        <span class="title">名师介绍</span>
      </div>
      <div class="detail_techer">
        <van-row class="content_list">
          <van-col span="12" class="content_list_l">
            <img src="@/assets/images/icon/banner.jpg" class="content_list_img"/>
          </van-col>
          <van-col span="19" class="content_list_r">
            <div class="content_list_con"><span class="content_list_title">国学国学国学国学国学国学国学</span></div>
            <div class="content_list_con content_list_con_b_t">
              <span class="content_list_c">共<span class="count_s">23</span>节</span>
              <span class="more">查看更多课程</span>
            </div>
          </van-col>
        </van-row>
        <div class="teacher_con">
          111
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  components: {
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
  },
  watch: {

  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    indexListData () {
    }
  }
}
</script>
<style lang="scss">
.components_container {
}
</style>
<style lang="scss" scoped>
.components_container {
  // 公共标题
  .title_con {
    height: 18px;
    line-height: 12px;
    padding: 15px 13px;
    background: #ffffff;
    margin-top: 10px;
    overflow: hidden;
    border-bottom:1px solid #f9f9f9;
  }
  .icon_de {
    font-size: 18px;
    color: #cfc19a;
    float: left;
  }
  .title {
    display: inline-block;
    font-size: 15px;
    margin-left: 5px;
    float: left;
    padding-top: 4px;
  }
  .title_con_t {
    margin-top: 10px;
  }
  // 标题
  .detail_title_con {
    padding:15px 13px;
    background: #ffffff;
  }
  .detail_title {
    line-height: 15px;
  }
  .detail_title_msg {
    font-size: 15px;
  }
  .content_list_price {
    font-size: 13px;
    color: #cfc19a;
  }
  .content_list_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  .content_list_c {
    font-size: 13px;
    color: #b0b0b0;
  }
  .content_list_con {
    height: 30px;
    line-height: 30px;
  }
  .content_list_z {
    float: right;
    position: relative;
    top: 6px;
  }
  // 详情
  .content_detail {
    background: #ffffff;
    padding-left: 13px;
    padding-right: 13px;
  }
  // 名师详情
  .detail_teacher {
    border-bottom:1px solid #f9f9f9;
  }
  .content_list {
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 17px;
    padding-bottom: 17px;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
  }
  .content_list_l {
    width: 50px;
    position: relative;
  }
  .content_list_r {
    float: right;
    width: 82%;
    // padding-left: 15px;
  }
  .content_list_img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    position: relative;
    top: 10px;
  }
  .content_list_con {
    line-height: 13px;
  }
  .content_list_con_b {
    padding-top: 13px;
    padding-bottom: 8px;
  }
  .content_list_title {
    font-size: 15px;
  }
  .content_list_price {
    font-size: 13px;
    color: #cfc19a;
  }
  .content_list_desc{
    font-size: 11px;
    color: #9c9c9c;
  }
  .more {
    color: #db9774;
    font-size: 13px;
    float: right;
    position: relative;
    top: 6px;
  }
  .count_s {
    color: #db9774;
  }
  .content_list_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  .content_list_c {
    font-size: 13px;
    color: #b0b0b0;
  }
  .content_list_btn {
    display: inline-block;
    width: 47px;
    height: 20px;
    font-size: 13px;
    background: #a98e5f;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
    border-radius: 10px;
  }
  .teacher_con {
    padding-left: 5px;
    padding-right: 5px;
    background: #ffffff;
    font-size: 15px;
  }
}
</style>
