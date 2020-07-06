<template>
  <div class="components_container">
    <div class="contents">
    <van-panel title="标题" desc="课程不错">
    </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  components: {
  },
  data () {
    return {
      active: 0
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
    indexListData () {
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
