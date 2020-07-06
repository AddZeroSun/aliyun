<template>
  <div class="teacher_detail">
    <div class="contents">
      <div class="title">
        <van-nav-bar :title="navTitle" left-text right-text left-arrow @click-left="onClickLeft" />
      </div>
      <div class="teacher_ban">
        <div class="teacher_ban_img">
          <van-image :src="teacher.headlogo" round width="60" height="60" fit="cover"></van-image>
        </div>
        <div class="teacher_ban_info">
          <p class="info_name">{{teacher.name}}</p>
          <div class="info_status">
            <van-grid :border="false" :column-num="3">
                  <van-grid-item class="info_status_item">
                    <div>
                      <p>{{teacher.courceAmount}}</p>
                      <p>课程数量</p>
                    </div>
                  </van-grid-item>
                  <van-grid-item class="info_status_item">
                    <div>
                      <p>{{teacher.learnAmount}}</p>
                      <p>学习人数</p>
                    </div>
                  </van-grid-item>
                  <van-grid-item class="info_status_collect">
                    <van-button size="small" icon="like-o">收藏</van-button>
                  </van-grid-item>
                </van-grid>
          </div>
        </div>
        <!-- <van-grid :border="false" :column-num="4">
                  <van-grid-item class="info_status_item">
                      <van-image :src="teacher.headlogo" round width="80" height="80" fit="cover"></van-image>
                  </van-grid-item>
                  <van-grid-item class="info_status_item">
                    <div>
                      <p>{{teacher.courceAmount}}</p>
                      <p>课程数量</p>
                    </div>
                  </van-grid-item>
                  <van-grid-item class="info_status_item">
                    <div>
                      <p>{{teacher.learnAmount}}</p>
                      <p>学习人数</p>
                    </div>
                  </van-grid-item>
                  <van-grid-item class="info_status_collect">
                    <van-button size="small" icon="like-o" color="transparent" plain>收藏</van-button>
                  </van-grid-item>
                </van-grid> -->
      </div>
      <div class="details_tab">
        <van-tabs v-model="active" title-active-color="#d2bd7a" color="#d2bd7a">
          <van-tab :title="tabLeft">
            <van-list
              class="con_list"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell class="con_list_cell" v-for="(item, index) in courceList" :key="index">
                <van-grid :border="false" :column-num="2" :center="false">
                  <van-grid-item class="con_cell_grid_left">
                    <div class="list_con">
                      <van-image :src="item.imgUrl"></van-image>
                      <p class="study_con">
                        <span class="study_con_msg">21250人学习</span>
                      </p>
                    </div>
                  </van-grid-item>
                  <van-grid-item class="con_cell_grid_right">
                    <div class="container_name">{{item.name}}</div>
                    <div class="container_footer">
                      <span v-if="item.price !== 0" class="span_price">￥ {{item.price}}</span>
                      <span v-else class="span_price_free">免费课程</span>
                      |
                      <span>{{item.section}}节</span>
                    </div>
                  </van-grid-item>
                </van-grid>
              </van-cell>
            </van-list>
          </van-tab>
          <van-tab title="讲师介绍">
            <div class="introduce">{{teacher.introduce}}</div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      navTitle: "讲师的主页",
      active: 0,
      tabLeft: "全部课程(0)",
      courceList: [
        {
          name: "语文犯得上发生二分三分瑟夫瑟夫二分三分是粉色",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          price: 300.0,
          section: "32",
          number: "999"
        },
        {
          name: "语文",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          price: 300.0,
          section: "32",
          number: "999"
        },
        {
          name: "语文",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          price: 0,
          section: "32",
          number: "999"
        },
        {
          name: "语文",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          price: 300.0,
          section: "32",
          number: "999"
        },
        {
          name: "语文",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          price: 300.0,
          section: "32",
          number: "999"
        },
        {
          name: "语文",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          price: 300.0,
          section: "32",
          number: "999"
        }
      ],
      loading: false,
      finished: false,
      teacherID: this.$route.teacherID,
      teacher: {
        introduce:
          "jaw来得及未来的家电节阿伟到家阿达地位家电节艾娃多久哦爱大家哦爱段位ijdoai大家奥尼打的阿大家奥尼滴啊为大家奥迪姐",
        teacherID: null,
        name: "张三",
        headlogo: "https://img.yzcdn.cn/vant/cat.jpeg",
        courceAmount: 10,
        learnAmount: 1232321
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    indexListData() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.courceList.push(this.courceList.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.courceList.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>
<style lang="scss">
.teacher_detail {
  .details_tab {
    .van-tabs__line {
      width: 50% !important;
    }
  }
  .info_status {
    .van-grid-item__content {
            background-color: transparent;
          }
  }
  .van-button--default {
    color: #ffffff;
    background-color: transparent;
    // opacity: 0.3;
  }
}
</style>
<style lang="scss" scoped>
.teacher_detail {
  .contents {
    // background: #ffffff;
    width: 100%;

    //顶部标题栏
    .title {
      .van-nav-bar__arrow {
        color: #969799;
        font-size: 24px;
        cursor: pointer;
      }
    }

    .teacher_ban {
      background-color: #ea7375;
      background-image: url("");
      box-sizing: border-box;
      width: 100%;
      padding: 24px 0px 24px 8px;

      .teacher_ban_img {
        float: left;
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .teacher_ban_info {
        box-sizing: border-box;
        color: #dcdfe6;

        .info_name {
          box-sizing: border-box;
          font-size: 16px;
          color: #ffffff;
          padding-left: 100px;
        }
        .info_status {
          
          .van-grid-item__content {
            background-color: red;
          }
          .info_status_item {
            font-size: 14px;
            text-align: center;
          }

          .info_status_collect {
            // color: #ffffff;
          }
        }
        
        
      }
    }
    .teacher_ban:after {
      content: '';
      display: block;
      clear: both;
    }
    // tab切换
    .details_tab {
      .con_list_cell {
        .con_cell_grid_left {
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
        .con_cell_grid_right {
          .container_name {
            margin: 4px 0;
            text-align: left;
            font-size: 14px;
          }
          .container_footer {
            height: 28px;
            font-size: 14px;
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
              background-image: linear-gradient(
                to bottom right,
                #dfb687,
                #a98e5f
              );
              color: #ffffff;
              padding: 0 10px;
              border-radius: 10px;
            }
          }
        }
      }

      .introduce {
        width: 100%;
        box-sizing: border-box;
        padding: 12px 8px;
        background-color: #ffffff;
        font-size: 14px;
        line-height: 20px;
        color: #323233;
      }
    }
  }
}
</style>
