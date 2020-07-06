<template>
  <div class="all_teacher_elegant">
    <div class="title">
      <van-nav-bar title="我收藏的讲师"
                   left-text=""
                   right-text=""
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-row class="content_list">
        <van-col span="12"
                 class="content_list_l">
          <img src="@/assets/images/icon/banner.jpg"
               class="content_list_img" />
        </van-col>
        <van-col span="19"
                 class="content_list_r">
          <div class="content_list_con"><span class="content_list_title">国学国学国学国学国学国学国学</span></div>
          <div class="content_list_con"><span class="content_list_title content_list_desc">国学国学国学国学国学国学国学</span></div>
          <div class="content_list_con content_list_con_b">
            <span class="content_list_c">共<span class="count_s">23</span>课程</span>
            <span class="more">查看更多课程</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row class="content_list">
        <van-col span="12"
                 class="content_list_l">
          <img src="@/assets/images/icon/banner.jpg"
               class="content_list_img" />
        </van-col>
        <van-col span="19"
                 class="content_list_r">
          <div class="content_list_con"><span class="content_list_title">国学国学国学国学国学国学国学</span></div>
          <div class="content_list_con content_list_con_b">
            <span class="content_list_c">暂无课程</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Row, Col } from 'vant'
export default {
  name: 'Home',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Row.name]: Row,
    [Row.Col]: Col
  },
  data () {
    return {
      searchKey: '',
      searchData: {
        course_selection: 0, // 课程筛选
        all_teacher_elegant: 0
      },
      courseList: [
        { text: '综合排序', value: 0 },
        { text: '免费课程', value: 1 },
        { text: '价格优先', value: 2 },
        { text: '人气优先', value: 3 },
        { text: '好评优先', value: 4 }
      ],
      all_teacher_elegant: [
        { text: '全部分类', value: 0 }
      ]
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
    onClickLeft () {
      this.$router.go(-1)
    },
    indexListData () {
    }
  }
}
</script>
<style lang="scss">
.all_teacher_elegant {
  .van-nav-bar__arrow {
    color: #969799;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
.all_teacher_elegant {
  .contents {
    width: 100%;
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
    width: 18%;
    position: relative;
  }
  .content_list_r {
    float: right;
    width: 82%;
    padding-left: 15px;
  }
  .content_list_img {
    width: 70px;
    height: 70px;
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
  .content_list_desc {
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
  // 学习数量
  .study_con {
    position: absolute;
    bottom: 6px;
    right: 0px;
    height: 20px;
    line-height: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.6);
  }
  .study_con_msg {
    font-size: 11px;
    color: #ffffff;
  }
}
</style>
