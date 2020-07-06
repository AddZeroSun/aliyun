<template>
  <div class="course_detail">
    <van-nav-bar
      title="讲师列表"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="contents">
      <div class="top_con">
        <div class="video_con" v-if="active === 1">
          <video id="video" class="video_con" controls preload="none" :src="videoSrc" :poster="poster"></video>
        </div>
        <img v-if="active === 0 || active === 2" class="course_detail_ban" src="@/assets/images/vip_bg.png"/>
      </div>
      <div class="course_detail_tab">
        <van-tabs v-model="active" title-active-color="#d2bd7a" color="#d2bd7a">
          <van-tab title="详情">
            <detail></detail>
          </van-tab>
          <van-tab title="目录">
            <directory @change-video="changeVideo"></directory>
          </van-tab>
          <van-tab title="评价(9)">
            <comments></comments>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-button color="#cfc19a" type="danger" text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Row, Col } from 'vant'
import Detail from './components/detail.vue'
import Directory from './components/directory.vue'
import Comments from './components/comments.vue'
export default {
  name: 'CourseDetail',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Row.name]: Row,
    [Row.Col]: Col,
    Detail,
    Directory,
    Comments
  },
  data () {
    return {
      videoSrc: '',
      poster: '',
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
    changeVideo (val) {
      this.videoSrc = val.url
      this.poster = val.poster
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.course_detail {
  .van-nav-bar__arrow {
    color: #969799;
    font-size: 24px;
    cursor: pointer;
  }
  .course_detail_tab {
    .van-tabs__line {
      width: 30%!important;
    }
  }
}
</style>
<style lang="scss" scoped>
.course_detail {
  .contents {
    // background: #ffffff;
    width: 100%;
    padding-bottom: 50px;
  }
  .top_con {
    height: 240px;
  }
  .video_con {
    // min-height: 100%;
  }
  #video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  // banner
  .course_detail_ban {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .is_mem_con {
    background: #ffffff;
    text-align: center;
    height: 44px;
    line-height: 30px;
    margin-bottom: 8px;
  }
  .course_detail_tab {
    position: relative;
    top: -13px;
  }
}
</style>
