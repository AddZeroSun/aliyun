<template>
  <div class="home">
    <div class="title">
      <van-search placeholder="搜索您感兴趣的课程" v-model="searchKey" />
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img class="swiper_img" src="@/assets/images/product/小米净水器.jpg" />
        </van-swipe-item>

        <van-swipe-item>
          <img class="swiper_img" src="@/assets/images/product/小米净水器.jpg" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="elegant_demeanor">
      <div class="container_title">
        <van-cell title="名师风采" is-link to="/all-teacher-elegant" value="查看全部" icon="manager-o"></van-cell>
      </div>
      <div class="container">
        <div class="child_teacher" v-for="(teacher, index) in teachers" :key="index">
          <div class="teacher_img" @click="gotoTeacherDetail(teacher.id)">
            <van-image :src="teacher.head" fit="cover" />
          </div>
          <p class="teacher_name">{{ teacher.name }}</p>
        </div>
      </div>
    </div>

    <div class="recommended_courses">
      <div class="container_title">
        <van-cell title="推荐课程" is-link to="/Introduction-course" value="查看更多" icon="good-job-o"></van-cell>
      </div>
      <div class="container">
        <van-grid :border="false" :center="false" :column-num="2">
          <van-grid-item v-for="(course, index) in courses" :key="index" @click="gotoCourseDetail(course.id)">
            <div class="list_con">
              <van-image :src="course.image"></van-image>
              <p class="study_con">
                <span class="study_con_msg">{{course.learn_num}}人学习</span>
              </p>
            </div>

            <div class="container_name">{{ course.name }}</div>

            <div class="container_footer">
              <span v-if="course.price !== 0" class="span_price">￥ {{ course.price }}</span>
              <span v-else class="span_price_free">免费课程</span>
              |
              <span>{{ course.chapter_num }}节</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- <van-button type="info"
                size="mini"
    @click="indexListData">信息按钮</van-button>-->
  </div>
</template>

<script>
// import md5 from 'js-md5'
import { teacherRecommendList, courseRecommendList } from '@/api/home.js'
import { login } from '@/api/user.js'
import { Toast } from 'vant'
import { log } from 'util'
import { sign } from 'crypto'
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      authSign: '48b631799fa1db87230f1f9730f70a2a', // 签名
      searchKey: '',
      images: ['1.jpg', '2.jpg', '../../assets/images/product/takeTV.wepb'],
      teachers: [
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 1 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 2 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 3 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 4 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 5 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 6 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 7 },
        { name: '张三', head: 'https://img.yzcdn.cn/vant/cat.jpeg', id: 8 }
      ],
      courses: [
        {
          id: 1,
          name: '语文犯得上发生二分三分瑟夫瑟夫二分三分是粉色',
          image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 300.0,
          chapter_num: '32',
          learn_num: '999'
        },
        {
          id: 2,
          name: '语文',
          image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 300.0,
          chapter_num: '32',
          learn_num: '999'
        },
        {
          id: 3,
          name: '语文',
          image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 0,
          chapter_num: '32',
          learn_num: '999'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getTeacherRecommendList()
    this.getCourseRecommendList()
  },
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
    },
    // 获取推荐名师列表
    getTeacherRecommendList () {
      const jsonData = {
        is_recommend: 1,
        sign: this.authSign
      }
      teacherRecommendList(jsonData).then(res => {
        if (res.data && res.code === 200) {
          this.teachers = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取推荐课程列表
    getCourseRecommendList () {
      const jsonData = {
        is_recommend: 1,
        sign: this.authSign
      }
      courseRecommendList(jsonData).then(res => {
        if (res.data && res.code === 200) {
          this.courses = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 名师详情
    gotoTeacherDetail (id) {
      this.$router.push({
        name: 'teacher-detail',
        query: {
          teacher_id: id
        }
      })
    },
    // 课程详情
    gotoCourseDetail (id) {
      this.$router.push({
        name: 'course-detail',
        query: {
          id: id
        }
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

  .swiper_img {
    width: 100%;
  }

  .elegant_demeanor {
    background-color: #ffffff;

    .van-cell__title {
      font-weight: bold;
      font-size: 16px;
    }
    .container {
      margin-bottom: 10px;
      overflow-x: scroll;
      white-space: nowrap;

      .child_teacher {
        display: inline-block;
        box-sizing: border-box;
        margin: 0 10px;
        // width: 100px;
        width: 30%;
        text-align: center;

        .teacher_img {
          // width: 30%;
        }
        .teacher_name {
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }

  .recommended_courses {
    background-color: #ffffff;
    .van-cell__title {
      font-weight: bold;
      font-size: 16px;
    }
    .container {
      margin: 0 4px;
      .container_name {
        margin: 4px 0;
        text-align: left;
        font-size: 16px;
      }
      .container_footer {
        height: 28px;
        font-size: 16px;
        color: #b0b0b0;

        .span_price {
          color: #f2d39c;
        }
        .span_price_free {
          height: 28px;
          line-height: 28px;
          box-sizing: border-box;
          display: inline-block;
          background-color: #a98e5f;
          background-image: linear-gradient(to bottom right, #dfb687, #a98e5f);
          color: #ffffff;
          padding: 0 10px;
          border-radius: 10px;
        }
      }
    }
  }
  .list_con {
    position: relative;
  }
  // 学习数量
  .study_con {
    position: absolute;
    bottom: 10px;
    right: 0px;
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    font-size: 11px;
    background: rgba(0, 0, 0, 0.6);
  }
  .study_con_msg {
    color: #ffffff;
  }
}
</style>
