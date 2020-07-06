<template>
  <div class="data_sta">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        111
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        222
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        333
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        444
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import CountTo from 'vue-count-to'

export default {
  name: 'DataStatistics',
  components: {
    // CountTo
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.data_sta {
  @media (max-width: 1024px){
  // body{font-size: 18px}
  } /*<=1024的设备*/
  @media (max-width: 1100px) {
  // body{font-size: 20px}
  } /*<=1100的设备*/
  @media (max-width: 1280px) {
  // body{font-size: 22px;}
  } /*<=1280的设备*/
  @media (max-width: 1366px) {
  // body{font-size: 24px;}
  }

  @media (max-width: 1440px) {
  // body{font-size: 25px !important;}
  }
  @media (max-width: 1680px) {
  // body{font-size: 28px;}
  }
  @media (max-width: 1920px) {
    // body{font-size: 33px;}
  }
}
</style>
