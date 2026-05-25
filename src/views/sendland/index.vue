<template>
  <div class="app-container">
    <!--form 组件-->
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="id" align="center" width="100" />
          <el-table-column label="级别" prop="level" align="center" width="100" />
          <el-table-column label="地址" prop="address" align="center" width="250" />
          <el-table-column label="肥沃度" prop="health" align="center" />
          <el-table-column label="状态" prop="status" align="center" />
          <el-table-column label="增产率" prop="outRate" align="center" />
          <el-table-column label="种植消耗" prop="perHealth" align="center" />
          <el-table-column label="出租金额" prop="rentAmount" align="center" />
          <el-table-column label="出租状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.two==='1'?'可出租':'不可出租' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合成状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.three==='1'?'可合成':'不可合成' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="出售状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.one==='1'?'可出售':'不可出售' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="动静态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.four==='1'?'可动静态':'不可动静态' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="过期状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.five==='1'?'过期':'未过期' }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column
            fixed="right"
            width="150"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" class="btn-option" size="mini" @click="detailHandler(scope.row)">查看下级</el-button>
            </template>
          </el-table-column> -->
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
import { sendLandList } from '@/api/orderModel'

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
      list: []
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
      sendLandList({
        page: page || this.page

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
