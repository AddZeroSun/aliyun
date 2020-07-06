<template>
  <div class="home">
    <div class="title">
      登录
    </div>
  </div>
</template>

<script>
// import md5 from 'js-md5'
import { login } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'Login',
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    indexListData () {
      let data = {
        phone: '13315178595',
        prefix: 86,
        sms_code: '1234',
        timestamp: Date.parse(new Date()) / 1000
        // sign: md5('T9r2Cd' + md5('13315178595') + md5('86') + md5('1234') + md5((Date.parse(new Date()) / 1000).toString()) + 'T9r2Cd')
        // sign: ''
      }
      //   let str = ''
      //   let sign = ''
      //   for (let key in data) {
      //     str += md5((data[key]).toString())
      //   }
      //   sign = md5('T9r2Cd' + str + 'T9r2Cd')
      //   data.sign = sign
      login(data)
        .then(res => {
          console.log(res)
          Toast(res.msg)
          // if (res.data && res.status === 200) {
          // }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .title {
    font-size: 20px;
  }
}
</style>
