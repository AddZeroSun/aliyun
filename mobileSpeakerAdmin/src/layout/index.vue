<template>
  <div :class="classObj" class="app-wrapper" @click="clickApp">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import defaultSettings from '@/settings'
import Utils from '@/utils/util.js'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      clickTime: new Date(),
      timeout: null,
      lockTime: ''
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  // destroyed() {
  // },
  mounted() {
    if (defaultSettings.openLock) {
      this.lockTime = this.lockTimeNum()
    }
    const _this = this
    Utils.$on('userLogin', function(res) {
      // console.log(res)
      _this.$message({
        message: res.message,
        type: 'warning'
      })
      setTimeout(() => {
        _this.logout()
      }, 500)
    })
    // console.log(defaultSettings)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push({ name: 'login' })
    },
    lockTimeNum() {
      const hours = parseInt(defaultSettings.hours) * 60 * 60
      const minutes = parseInt(defaultSettings.minutes) * 60
      const lockTime = hours + minutes
      return lockTime
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    clickApp() {
      const _this = this
      if (defaultSettings.openLock) {
        var nowTime = new Date()
        if (nowTime - this.clickTime <= 30000) { // 如果距离上次点击小于30s
          clearTimeout(this.timeout)
          this.timeout = setTimeout(function() {
            // console.log('lock')
            sessionStorage.setItem('isLock', 1)
            // _this.$store.dispatch('user/setLock', lockInfo).then((res) => {
            // }).catch(() => {
            // })
            _this.$router.push({
              name: 'lock',
              params: {}
            })
          }, this.lockTime)
        }
        this.clickTime = nowTime // 设置点击时间为当前时间
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
