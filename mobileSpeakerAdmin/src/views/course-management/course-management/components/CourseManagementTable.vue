<template>
  <div class="components_container">
    <el-table ref="OriginalManagementTable" border :data="dataCon" highlight-current-row>
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <!-- <el-table-column align="center" label="权重" width="120" fixed="left">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.sort" :controls="false" size="small" controls-position="right" :min="0" :max="999" @change="((newVal, oldVal)=>{handleIndexChange(newVal, oldVal, scope)})" />
        </template>
      </el-table-column> -->
      <el-table-column align="center" property="sort" width="70" label="权重" />
      <el-table-column align="center" property="id" width="70" label="课程ID" />
      <el-table-column align="center" label="封面" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.image" min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column align="center" property="name" show-overflow-tooltip label="课程名称" />
      <el-table-column align="center" property="teacher_name" label="讲师姓名" />
      <el-table-column align="center" property="course_spe" label="课程规格" />
      <el-table-column align="center" property="chapter_number" label="章节数" />
      <el-table-column align="center" property="price" label="价格" />
      <el-table-column align="center" property="add_time" width="160" show-overflow-tooltip label="上架时间" />
      <el-table-column align="center" property="learn_num" label="学习人数" />
      <el-table-column align="center" property="collect_num" label="收藏数" />
      <el-table-column align="center" label="显示" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_show === 1" type="primary" size="small" @click="editArtistShow(scope.row)">显示</div>
          <div v-if="scope.row.is_show === 0" type="danger" size="small" @click="editArtistShow(scope.row)">隐藏</div>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" fixed="right" label="置顶" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.stick"
            :active-value="1"
            :inactive-value="0"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            @change="((val)=>{editArtistStick(val, scope.row)})"
          >
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="推荐" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.is_recommend === 1" type="primary" size="small">推荐</div>
          <div v-if="scope.row.is_recommend === 0" type="success" size="small">不推荐</div>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="openEditor(1,scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="openEditor(2, scope.row)">详情</el-button>
          </div>
          <el-button type="text" size="small" @click="openEditor(3, scope.row)">课程章节</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { getOriginalStatus } from '@/api/originalManagement.js'
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
      dataCon: this.dataList,
      //   dataCon: [{}, {}], // 测试数据
      statusList: this.statuslist
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
    // 修改是否显示状态
    editArtistShow(_row) {
      const data = {
        artist_id: _row.artist_id,
        is_show: _row.is_show
      }
      this.$emit('change-show', data)
    },
    // 修改置顶状态
    editArtistStick(val, _row) {
      const data = {
        artist_id: _row.artist_id,
        stick: _row.stick === 1 ? 0 : 1
      }
      this.$emit('change-stick', data)
    },
    // 打开详情和编辑
    openEditor(_type, _row) {
      this.$emit('open-editor', _type, _row)
    },
    // 修改状态
    editArtistStatus(_row) {
      const data = {
        artist_id: _row.artist_id,
        status: _row.status
      }
      this.$emit('change-status', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.components_container{
  .pub_price_w {
    font-size: 18px;
    // color: red;
  }
  .pub_m {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
