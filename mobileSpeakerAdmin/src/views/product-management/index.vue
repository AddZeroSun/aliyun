<template>
  <div class="product_management_container">
    <div class="product_management_text">商品管理</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductManagement',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        prefix: 86
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product_management_container{
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
