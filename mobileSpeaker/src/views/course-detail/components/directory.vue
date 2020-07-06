<template>
  <div class="components_container">
    <div class="contents">
    <van-cell-group v-for="item in videoData" :key="item.id">
      <van-cell class="title" :title="item.title" icon="label-o">
      </van-cell>
      <van-cell v-for="item in item.list" :key="item.id" @click="playVideo(item)">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <van-tag plain>视屏</van-tag>
          <span class="custom_title">{{ item.title }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Directory',
  components: {},
  data () {
    return {
      active: 0,
      videoData: [
        {
          id: 0,
          title: '课程大纲',
          list: [
            {
              id: 0,
              title: '课程1',
              url:
                'https://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4',
              poster:
                'https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820'
            },
            {
              id: 1,
              title: '课程2',
              url:
                'http://video.699pic.com/videos/22/04/18/a_Pe8c8ryBB4bj1569220418.mp4',
              poster:
                'https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820'
            },
            {
              id: 2,
              title: '课程3',
              url:
                'http://video.699pic.com/videos/86/82/16/a_V5kZaNyT3Y8J1570868217.mp4',
              poster:
                'https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820'
            }
          ]
        },
        {
          id: 1,
          title: '课程大纲1',
          list: [
            {
              id: 0,
              title: '课程1',
              url:
                'https://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4',
              poster:
                'https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820'
            },
            {
              id: 1,
              title: '课程2',
              url:
                'http://video.699pic.com/videos/22/04/18/a_Pe8c8ryBB4bj1569220418.mp4',
              poster:
                'https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820'
            },
            {
              id: 2,
              title: '课程3',
              url:
                'http://video.699pic.com/videos/86/82/16/a_V5kZaNyT3Y8J1570868217.mp4',
              poster:
                'https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820'
            }
          ]
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    playVideo (_data) {
      this.$emit('change-video', _data)
    }
  }
}
</script>
<style lang="scss">
.components_container {
}
</style>
<style lang="scss" scoped>
.components_container {
  .title {
    background: #f2f1f7;
  }
  .list_icon {
    color: #cfc19a;
  }
  .custom_title {
    margin-left: 10px;
  }
}
</style>
