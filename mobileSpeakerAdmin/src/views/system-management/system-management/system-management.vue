<template>
  <div class="system_management">
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
          </el-col>-->
        </el-row>
      </div>
      <div class="system_content">
        <el-tabs v-model="showType" @tab-click="handleClick">
          <el-tab-pane label="轮播管理" name="0">
            <carousel-table></carousel-table>
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
import mixin from '@/utils/mixin'
import CarouselTable from './components/CarouselTable.vue'
export default {
  name: 'SystemManagement', // 系统管理
  components: {
    CarouselTable
  },
  mixins: [mixin],
  data() {
    return {
      showType: '0'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created() {
    if (this.$route.query.showType) {
      this.showType = this.$route.query.showType
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    handleClick() {
    //   if (this.showType === '0') {
    //     this.showType = '1'
    //   } else {
    //     this.showType = '0'
    //   }
    }
  }
}
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
.system_management {
}
</style>
