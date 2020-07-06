<template>
  <div class="user_info">
    <div class="contents">
        <van-nav-bar
            title="个人中心"
            left-text=""
            right-text=""
            left-arrow
            @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-field
                v-model="dataList.nick_name"
                clearable
                label-width="60px"
                label="昵称"
                placeholder="请输入昵称"
            />
            <van-field
                v-model="dataList.name"
                clearable
                label-width="60px"
                label="真实姓名"
                placeholder="请输入真实姓名"
            />
            <van-field
                v-model="dataList.sex"
                clearable
                label-width="60px"
                label="性别"
                readonly
                placeholder="性别"
                @click="showSex = true"
            />
           <van-action-sheet
                v-model="showSex"
                :actions="sexList"
                @select="selectSex"
                cancel-text="取消"
                @cancel="onCancel"
            />
            <van-field
                v-model="dataList.data"
                clearable
                label-width="60px"
                label="出身日期"
                readonly
                placeholder="出身日期"
                @click="showData = true"
            />
            <van-field
                v-model="dataList.phone"
                clearable
                label-width="60px"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="dataList.qqnum"
                clearable
                label-width="60px"
                label="QQ号"
                placeholder="请输入QQ号"
            />
            <van-field
                v-model="dataList.message"
                rows="2"
                autosize
                label="自我介绍"
                label-width="60px"
                type="textarea"
                maxlength="50"
                placeholder="请输入自我介绍"
                show-word-limit
            />
            <van-popup
                v-model="showData"
                position="bottom"
            >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="sureDate"
                @cancel="cancelDate"
                @change="endTimeChange"
                :formatter="formatter"
            />
            </van-popup>
        </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  components: {
  },
  data () {
    return {
      showSex: false,
      showData: false,
      currentDate: new Date(),
      minDate: new Date(1368, 1, 1),
      maxDate: new Date(),
      end_time: '',
      sexList: [
        { name: '男', id: '0' },
        { name: '女', id: '1' }
      ],
      dataList: {
        nick_name: '',
        name: '',
        sex: '',
        showData: '',
        phone: '',
        data: '',
        qqnum: '',
        message: ''
      }
    }
  },
  computed: {
  },
  watch: {

  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else {
        return `${value}日`
      }
    //   return value
    },
    sureDate (val) {
      this.dataList.data = this.end_time
      this.showData = false
    },
    endTimeChange (e) {
      let endTimeArr = e.getValues()
      this.end_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`
    },
    cancelDate () {
      this.showData = false
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    selectSex (val) {
      this.dataList.sex = val.name
      this.showSex = false
    },
    onCancel () {
      this.showSex = false
    }
  }
}
</script>
<style lang="scss">
.user_info {
  .van-nav-bar__arrow {
    color: #969799;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.user_info {
  .members_tab {
    .van-tabs__line {
      // width: 50%!important;
    }
  }
}
</style>
<style lang="scss" scoped>
.user_info {
}
</style>
