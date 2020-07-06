const mixin = {
  data () {},
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
export default mixin
