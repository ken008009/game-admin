<template>
  <div class="app-container">
    <!--form 组件-->
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container">
          <div class="cont-tab">
            <el-radio-group v-model="coinType" @input="switchTypeHandler">
              <el-radio :label="'ispay'">ISPAY</el-radio>
              <el-radio :label="'usdt'">USDT</el-radio>
              <!-- <el-radio :label="'usdt_two'">USDT充值BIW</el-radio> -->
            </el-radio-group>
          </div>
          <div class="cont-search">
            <span>地址：</span>
            <el-input v-model="form.address" class="input-desc" placeholder="请输入用户地址" />
            <el-button type="primary" class="add" icon="el-icon-search" @click="searchHandler()">搜索</el-button>
            <el-button type="primary" class="add" icon="el-icon-refresh-left" @click="resetHandler()">重置</el-button>
          </div>

        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="时间" prop="createdAt" align="center" width="200" />
          <el-table-column label="金额" prop="amount" align="center" />
          <!-- <el-table-column label="BIW数量" prop="amountBiw" align="center" /> -->
          <el-table-column label="充值地址" prop="address" align="center" />

          <!-- <el-table-column
            fixed="right"
            width="150"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" class="btn-option" size="mini" @click="editHandler(scope.row)">查看下级</el-button>
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
import { recordList } from '@/api/orderModel'

const default_form = {
  address: ''
}
export default {
  name: 'RechargeList',
  components: { },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      list: [],
      coinType: 'usdt',
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
    switchTypeHandler: function(e) {
      this.initList(1)
    },
    initList(page) {
      const coin = this.coinType
      recordList({
        page: page || this.page,
        coin: coin,
        address: this.form.address

      }).then(res => {
        this.list = res.recordList
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
