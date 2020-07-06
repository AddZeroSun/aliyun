<template>
  <div class="lock_container">
    <div class="lock_content">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 14px;">
          <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
            <el-form-item prop="pass">
              <el-input v-model="ruleForm.pass" placeholder="请输入锁屏密码(登录密码)" type="password" auto-complete="off" />
            </el-form-item>
            <el-form-item>
              <el-button class="lock_btn" type="primary" @click="openLockWin()">锁屏密码</el-button>
            </el-form-item>
          </el-form>
          <!-- <el-form :model="ruleSetForm" status-icon :rules="setrules" ref="ruleSetForm" class="demo-ruleForm">
            <el-form-item prop="setpass">
              <el-input placeholder="请输入设置的锁屏密码" type="setpassword" v-model="ruleSetForm.setpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="lock_btn" type="primary" @click="setPass()">下一步</el-button>
            </el-form-item>
          </el-form> -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入锁屏密码'))
      } else {
        callback()
      }
    }
    var validateSetPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请设置锁屏密码'))
      } else {
        callback()
      }
    }
    return {
      openLock: false,
      setLock: true,
      ruleSetForm: {
        setpass: ''
      },
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      setrules: {
        setpass: [
          { validator: validateSetPass, trigger: 'blur' }
        ]
      },
      rules: {
        setpass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  destroyed() { // window.removeEventListener('storage', this.afterQRScan)
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // let lockpass = sessionStorage.getItem('lockpass')
    // if(lockpass !== null || lockpass !== '' || lockpass !== undefined) {
    //   this.openLock = false
    //   this.setLock = true
    //   console.log(1111111)
    // } else {
    //   console.log(22222)
    //   this.openLock = false
    //   this.setLock = true
    // }
  },
  methods: {
    setPass() {
      this.$refs.ruleSetForm.validate((valid) => {
        if (valid) {
          const lockpass = this.ruleSetForm.setpass
          sessionStorage.setItem('lockpass', lockpass)
          this.openLock = true
          this.setLock = false
        } else {
          return false
        }
      })
    },
    openLockWin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const lockpass = sessionStorage.getItem('lockpass')
          const pass = this.ruleForm.pass
          if (lockpass === pass) {
            // let lockInfo = {
            //   lock: false
            // }
            sessionStorage.setItem('isLock', 0)
            // this.$store.dispatch('user/setLock', lockInfo).then((res) => {
            // }).catch(() => {
            // })
            this.$router.push({
              name: 'home',
              params: {}
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      // this.$refs.formName.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.lock_container{
  width: 100%;
  height: 100%;
  background-image: url('../../src/assets/lockbg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .lock_content {
    text-align: center;
    width: 300px;
    margin: 30px auto 0;
    padding: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-80%,-70%);
  }
  .lock_btn {
    width: 100%;
  }
}
</style>
