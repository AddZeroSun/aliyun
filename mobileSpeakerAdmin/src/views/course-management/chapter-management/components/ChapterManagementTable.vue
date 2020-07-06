<template>
  <div class="components_container">
    <el-table ref="OriginalManagementTable" border :data="dataCon" highlight-current-row>
      <el-table-column align="center" property="id" width="70" label="ID" />
      <el-table-column align="center" property="name" show-overflow-tooltip label="章节名称" />
      <el-table-column align="center" property="num" label="章节" />
      <el-table-column align="center" property="is_show_text" label="是否显示" />
      <el-table-column align="center" property="status_text" label="是否收费" />
      <el-table-column align="center" property="num" label="章节数" />
      <el-table-column align="center" property="course_name" label="所属课程" />
      <el-table-column align="center" property="add_time" width="160" show-overflow-tooltip label="上架时间" />
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openEditor(1,scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="openEditor(2, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'OriginalManagementTable',
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
    // 打开详情和编辑
    openEditor(_type, _row) {
      this.$emit('open-editor', _type, _row)
    }
  }
}
</script>

<style lang="scss" scoped>
.components_container{
  .pub_price_w {
    font-size: 18px;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
