<template>
  <div class="app-container">
    <!--form 组件-->
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="id" align="center" width="100" />
          <el-table-column label="地址" prop="address" align="center" />
          <!-- <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type==='1'?'种子':'道具' }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              <span>{{ listType[(parseInt(scope.row.num)-1)].label }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status==='4'?'出售中':'默认' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剩余次数" prop="useNum" align="center" />
          <el-table-column label="产出量" prop="outMax" align="center" />
          <el-table-column label="成长时间" prop="time" align="center" />
          <el-table-column label="售价" prop="amount" align="center" />

        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-size="size"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import initList from '@/mixins/initList'
import { sendToolList } from '@/api/orderModel'

const default_form = {
  address: ''
}
export default {
  name: 'GameList',
  components: { },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      list: [],
      listType: [
        { type: '1', label: '西红柿' },
        { type: '2', label: '哈密瓜' },
        { type: '3', label: '葡萄' },
        { type: '4', label: '橘子树' },
        { type: '5', label: '芒果树' },
        { type: '6', label: '苹果树' },
        { type: '7', label: '柚子' },
        { type: '8', label: '椰子树' },
        { type: '9', label: '枣椰树' },
        { type: '10', label: '红杉' },
        { type: '11', label: '化肥' },
        { type: '12', label: '水' },
        { type: '13', label: '手套' },
        { type: '14', label: '除虫剂' },
        { type: '15', label: '铲子' },
        { type: '16', label: '盲盒' },
        { type: '17', label: '地契' }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.initList(1)
    })
  },
  mounted() {
  },
  methods: {
    searchHandler: function() {
      this.initList(1)
    },
    resetHandler: function() {
      this.form = JSON.parse(JSON.stringify(default_form))
      this.initList(1)
    },
    switchTypeHandler: function(e) {
      this.initList(1)
    },

    initList(page) {
      sendToolList({
        page: page || this.page,
        reqType: '1'

      }).then(res => {
        this.list = res.list
        this.total = parseInt(res.count)

        this.loading = false
      })
    }

  }
}
</script>
<style lang='scss' scoped>
.el-avatar{
  background: #ffffff;
}
.head-container {
  display: flex;
  flex-direction: column;
  .cont-tab {
    margin-bottom: 10px;
    .mar-radio {
      margin-bottom: 5px;
    }
  }
  .cont-search {
    display: flex;
    align-items: center;
    .input-desc {
      width: 500px;
      margin-right: 30px;
    }
    .input-desc-long {
      margin-right: 30px;
    }
  }
  .cont-data {
    display: flex;
    align-items: center;
    margin-top: 30px;
    .title {
      font-weight: bold;
      color: red;
    }
    .num {
      font-weight: bold;
      margin-right: 30px;
      color: red;
    }
  }
}
.btn-option {
  margin-bottom: 5px;
}
</style>
