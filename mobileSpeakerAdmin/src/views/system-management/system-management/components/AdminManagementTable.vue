<template>
  <div class="components_container">
    <el-row class="table_top_btn">
      <!-- <el-button type="danger" @click="batchDelete()">批量删除</el-button> -->
      <el-button type="primary" class="add_btn" @click="openEditor(0,'')">添加</el-button>
    </el-row>
    <el-table ref="OriginalManagementTable" border :data="dataCon" highlight-current-row>
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column align="center" type="index" width="80" />
      <el-table-column align="center" property="id" label="管理员ID" />
      <el-table-column align="center" label="管理员头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.user_head" min-width="90" height="90" />
        </template>
      </el-table-column>
      <el-table-column align="center" property="username" show-overflow-tooltip label="管理员名称" />
      <el-table-column align="center" property="phone" label="手机号" />
      <el-table-column align="center" property="add_time" width="200" show-overflow-tooltip label="启用时间" />
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openEditor(1,scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="openEditor(2, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'AdminManagementTable',
  components: {
  },
  props: {
    datalist: {
      type: Array,
      default: function() {
        return []
      }
    },
    statuslist: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dataCon: this.dataList
    }
  },
  watch: {
    datalist(val) {
      this.dataCon = val
    },
    statuslist(val) {
      this.statusList = val
    }

  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 修改排序
    handleIndexChange(newVal, oldVal, _scope) {
      this.$confirm('确认修改排序吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          artist_id: _scope.row.artist_id,
          sort: newVal
        }
        this.$emit('change-sort', data)
      }).catch(() => {
        this.dataCon[_scope.$index].sort = oldVal
      })
    },
    // 打开详情和编辑和添加
    openEditor(_type, _row) {
      this.$emit('open-editor', _type, _row)
    },
    // 批量删除
    batchDelete() {
      console.log('batchDelete')
    }
  }
}
</script>

<style lang="scss" scoped>
.components_container{
  .add_btn {
    float: right;
  }
  .pub_price_w {
    font-size: 18px;
    // color: red;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
  }
  .table_top_btn {
    margin-bottom: 15px;
  }
}
</style>
