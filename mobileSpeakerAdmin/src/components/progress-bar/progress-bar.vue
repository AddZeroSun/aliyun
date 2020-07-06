<template>
  <!-- <Progress class="progress-width" :percent="progressCount" v-show="showProgressData"/> -->
  <el-progress v-show="showProgressData" class="pro_bar" :percentage="progressCount" status="success"></el-progress>
</template>
<script>
export default {
  props: {
    showprogress: {
      type: Boolean,
      default: false
    },
    progressCountData: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 上传图片进度条
      progressStartCount: 0,
      progressCount: this.progressCountData,
      progressEndCount: 100,
      showProgressData: this.showProgress
    }
  },
  watch: {
    showprogress(val) {
      this.showProgressData = val
    },
    progressCountData(val) {
      this.progressCount = val
    }
  },
  methods: {
    // 开始进度条
    startProgressBar() {
      const _self = this
      // _progressShow = true
      _self.progressCount = 0
      _self.changeProgressBar()
    },
    // 改变进度条
    changeProgressBar() {
      if (this.progressStartCount < this.progressEndCount) {
        // debugger
        this.progressCount = this.progressStartCount
        setTimeout(() => {
          if (this.progressStartCount < 90) {
            this.progressStartCount += 10
          }
          this.changeProgressBar(this.progressStartCount)
        }, 200)
      }
    },
    // 结束进度条
    endProgressBar() {
      const _self = this
      _self.progressStartCount = 100
      _self.progressCount = 100
    }
  }
}
</script>
<style lang="scss">
.pro_bar {
  .el-progress-bar {
    padding-right: 14px;
  }
  .el-progress__text {
    margin-left: 40px;
  }
}
</style>
