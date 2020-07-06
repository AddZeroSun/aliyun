<template>
<div class="layout">
  <div class="layout-main">
    <router-view></router-view>
  </div>
  <div class="layout-footer">
    <van-tabbar
    v-model="active"
    fixed
    active-color="#ff6700">
      <van-tabbar-item icon="wap-home" @click="routeChange('home')">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="balance-list" @click="routeChange('classify')">
        全部课程
      </van-tabbar-item>
      <van-tabbar-item icon="vip-card-o" @click="routeChange('members')">
        vip会员
      </van-tabbar-item>
      <van-tabbar-item icon="notes-o" @click="routeChange('my-course')">
        我的课程
      </van-tabbar-item>
      <van-tabbar-item icon="manager" @click="routeChange('my')">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</div>
</template>
<style lang="scss">
  .layout {
    min-height: 100%;
    background-color: #f1f0f5;
    .layout-main {
      margin-bottom: 34px;
      // height: 100vh;
    }
    .layout-footer {
      .van-tabbar {
        height: 33px;
        padding: 6px 0;
      }
      .van-tabbar-item__icon .van-icon {
        font-size: 20px;
      }
      .van-tabbar-item__text {
        font-size: 11px;
      }
    }
  }
</style>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      },
      active: 0
    }
  },
  computed: {
    ...mapState(['route'])
  },
  watch: {
    route: {
      handler: function (route) {
        switch (route.name) {
          case 'home':
            this.active = 0
            break
          case 'classify':
            this.active = 1
            break
          case 'members':
            this.active = 2
            break
          case 'my-course':
            this.active = 3
            break
          case 'my':
            this.active = 4
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    routeChange (path) {
      this.$router.push(path)
    }
  },
  mounted () {

  }
}
</script>
