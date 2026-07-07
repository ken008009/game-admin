<template>
  <div class="app-container">
    <!--form 组件-->
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container">
          <div class="cont-search">
            <span>地址：</span>
            <el-input v-model="form.address" class="input-desc" placeholder="请输入用户地址" />
            <el-button type="primary" class="add" icon="el-icon-search" @click="searchHandler()">搜索</el-button>
            <el-button type="primary" class="add" icon="el-icon-refresh-left" @click="resetHandler()">重置</el-button>
          </div>

        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="地址" prop="address" align="center" width="200" />
          <el-table-column label="质押数量" prop="amount" align="center" width="200" />
          <el-table-column label="价格" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="createdAt" align="center" width="200" />
          <el-table-column label="状态" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ getStakeStatus(scope.row.createdAt) }}</span>
            </template>
          </el-table-column>
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
import initList from '@/mixins/initList'
import { userStakeList } from '@/api/orderModel'

const default_form = {
  address: ''
}
export default {
  name: 'UserStakeList',
  components: { },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      list: [],
      totalCount: 0,
      totalArea: 0,
      totalPrice: 0
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
    getStakeStatus(createdAt) {
      if (!createdAt) return '-'
      // createdAt 格式：2026-06-17 00:00:01
      const created = new Date(createdAt.replace(/-/g, '/'))
      if (isNaN(created.getTime())) return '-'
      const thirtyDays = 30 * 24 * 60 * 60 * 1000
      return Date.now() - created.getTime() > thirtyDays ? '已过期' : '质押中'
    },
    initList(page) {
      userStakeList({
        page: page || this.page,
        address: this.form.address

      }).then(res => {
        this.list = res.stakeList
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
