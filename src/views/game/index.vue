<template>
  <div class="app-container">
    <!--form 组件-->
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container">
          <div class="cont-tab">
            <el-radio-group v-model="rewardType" @input="switchTypeHandler">
              <el-radio v-for="(item, index) in listType" :key="index" class="mar-radio" :label="item.type">{{ item.label }}</el-radio>
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
          <el-table-column label="用户地址" prop="userAddress" align="center" />
          <el-table-column label="时间" prop="createdAt" align="center" />
          <el-table-column label="金额" prop="amount" align="center" />
          <el-table-column label="下级地址" prop="address" align="center" />
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ getLabel(scope.row.rewardType) }}</span>
            </template>
          </el-table-column>
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
import { gameRewardList } from '@/api/orderModel'

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
      rewardType: '1',
      listType: [ // 类型：0=全部 1=种植 2=收租 3=粮仓 4=L1种植 5=L1收租 6=L1粮仓 7=L2种植 8=L2收租 9=L2粮仓 10=L3种植 11=L3收租 12=L3粮仓 13=手套偷取
        { type: '0', label: '全部' },
        { type: '1', label: '种植' },
        { type: '2', label: '收租' },
        { type: '3', label: '粮仓' },
        { type: '4', label: 'L1种植' },
        { type: '5', label: 'L1收租' },
        { type: '6', label: 'L1粮仓' },
        { type: '7', label: 'L2种植' },
        { type: '8', label: 'L2收租' },
        { type: '9', label: 'L2粮仓' },
        { type: '10', label: 'L3种植' },
        { type: '11', label: 'L3收租' },
        { type: '12', label: 'L3粮仓' },
        { type: '13', label: '手套偷取' },
        { type: '21', label: '购买盲盒' },
        { type: '22', label: '竞拍土地' },
        { type: '41', label: 'L1土地动态' },
        { type: '42', label: 'L2土地动态' },
        { type: '43', label: 'L3土地动态' },
        { type: '51', label: '土地静态' }
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
    getLabel: function(type) {
      const listType = this.listType
      const item = listType.find(i => i.type === String(type))
      return item ? item.label : ''
    },
    initList(page) {
      const rewardType = this.rewardType
      gameRewardList({
        page: page || this.page,
        rewardType: rewardType,
        address: this.form.address

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
