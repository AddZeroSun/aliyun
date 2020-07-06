<template>
  <div class="login-container">
    <el-form v-show="showPassWord" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">找回密码</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="登录手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- <el-form-item prop="captcha">
        <el-col :span="17">
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="图形验证码"
            name="captcha"
            tabindex="1"
            autocomplete="on"
          />
        </el-col>
        <el-col :span="7">
          <img class="img_captcha" :src="urlpublic+'login/captcha?'+rendomnum" alt="" @click="changeCaptcha">
        </el-col>
      </el-form-item> -->
      <el-form-item prop="phonecaptcha">
        <el-col :span="17">
          <el-input
            ref="phonecaptcha"
            v-model="loginForm.phonecaptcha"
            placeholder="手机验证码"
            name="phonecaptcha"
            tabindex="1"
            autocomplete="on"
          />
        </el-col>
        <el-col :span="7">
          <el-button class="phone_btn" :disabled="isTime" type="primary" @click="getSmsCodeData">{{ textBtnText }}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item class="phone_content" prop="phonecaptcha">
        <el-col :span="12" class="phone_captcha_con">
          <el-button class="phone_captcha_btn" type="primary" @click="openLogin">取消</el-button>
        </el-col>
        <el-col :span="12" class="phone_captcha_r">
          <el-button class="phone_captcha_btn" :loading="loading" type="primary" @click.native.prevent="checkSmsCode">下一步</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <el-form v-show="showNewPassWord" ref="restPassword" :model="restPassword" :rules="restPasswordRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">确认密码</h3>
      </div>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="restPassword.password"
          placeholder="新密码"
          name="password"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="newpassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="newpassword"
          v-model="restPassword.newpassword"
          placeholder="确认密码"
          name="newpassword"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item class="phone_content" prop="phonecaptcha">
        <el-button class="newpassword_btn" :loading="loading" type="primary" @click="resetPassData">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { captchaUrl, getSmsCode, checkSmsCode, resetPass } from '@/api/user.js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePhonecaptcha = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }
    const validateCaptcha = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入图形验证码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        captcha: '',
        prefix: 86,
        phonecaptcha: '',
        code: ''
      },
      restPassword: {
        password: '',
        newpassword: ''
      },
      showPassWord: true,
      showNewPassWord: false,
      // 图片验证码
      urlpublic: captchaUrl(),
      rendomnum: new Date().getTime(),
      imgUrl: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        phonecaptcha: [{ required: true, trigger: 'blur', validator: validatePhonecaptcha }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
      },
      restPasswordRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newpassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 计时器,注意需要进行销毁
      timeCounter: null,
      // null 则显示按钮 秒数则显示读秒
      textBtnText: '获取验证码',
      isTime: false,
      showtime: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 点击验证码图片时
    changeCaptcha() {
      this.rendomnum = new Date().getTime()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 获取验证码
    getSmsCodeData() {
      const data = {
        prefix: this.loginForm.prefix,
        phone: this.loginForm.username
        // captcha: this.loginForm.captcha
      }
      // console.log(data)
      getSmsCode(data).then(res => {
        // const _this = this
        // console.log(res)
        if (res.data && res.status === 200) {
          this.send()
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.loginForm.code = res.data.code
          sessionStorage.setItem('code', res.data.code)
          console.log(this.loginForm.code)
        } else {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 验证手机验证码
    checkSmsCode() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.code === '') {
            const code = sessionStorage.getItem('code')
            this.loginForm.code = code
          }
          const data = {
            phone: this.loginForm.username,
            code: this.loginForm.code
          }
          console.log(data)
          checkSmsCode(data).then(res => {
            // const _this = this
            console.log(res)
            if (res.data && res.status === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.loading = false
              this.showPassWord = false
              this.showNewPassWord = true
            } else {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.loading = false
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置密码
    resetPassData() {
      this.$refs.restPassword.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.restPassword.password !== this.restPassword.newpassword) {
            this.$message({
              message: '俩次密码不一致请重新输入',
              type: 'warning'
            })
            this.loading = false
            return false
          }
          // const data = {
          //   prefix: this.loginForm.prefix,
          //   phone: this.loginForm.username,
          //   new_password: this.restPassword.password,
          //   new_password_confirmation: this.restPassword.newpassword
          // }
          const formFile = new FormData()
          formFile.append('prefix', this.loginForm.prefix)
          formFile.append('phone', this.loginForm.username)
          formFile.append('new_password', this.restPassword.password)
          formFile.append('new_password_confirmation', this.restPassword.newpassword)
          // console.log(data)
          resetPass(formFile).then(res => {
            // const _this = this
            console.log(res)
            if (res.data && res.status === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.loading = false
              this.$router.push({
                name: 'login',
                params: {}
              })
            } else {
              // this.$message({
              //   message: res.message,
              //   type: 'success'
              // })
              this.loading = false
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    // 倒计时
    // 倒计时显示处理
    countDownText(s) {
      this.showtime = `${s}s后重新获取`
      this.textBtnText = `${s}s后重新获取`
    },
    // 倒计时 60秒 不需要很精准
    countDown(times) {
      const self = this
      // 时间间隔 1秒
      const interval = 1000
      let count = 0
      self.timeCounter = setTimeout(countDownStart, interval)
      function countDownStart() {
        if (self.timeCounter == null) {
          return false
        }
        count++
        self.countDownText(times - count + 1)
        if (count > times) {
          clearTimeout(self.timeCounter)
          self.showtime = null
          self.isTime = false
          self.textBtnText = `获取验证码`
        } else {
          self.timeCounter = setTimeout(countDownStart, interval)
        }
      }
    },
    send() {
      this.isTime = true
      this.countDown(60)
    },
    openLogin() {
      this.$router.push({
        name: 'login',
        params: {}
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .phone_content {
    border: 0px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0);
    background-color: #2d3a4b;
    border-radius: 5px;
  }
  .img_captcha {
    width: 100%;
    height: 34px;
    position: relative;
    top: 6px;
  }
  .phone_btn {
    width: 100%;
    position: relative;
    top: 3px;
  }
  .phone_captcha_r {
    text-align: right;
  }
  .phone_captcha_btn {
    width: 90%;
  }
  .newpassword_btn {
    width: 100%;
  }
}
</style>
