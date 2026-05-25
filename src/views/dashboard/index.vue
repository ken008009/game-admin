<template>
  <div class="app-container">
    <!--form 组件-->
    <eForm ref="form" />
    <eLevelForm ref="form2" />
    <eMaxForm ref="form3" />
    <eAddrForm ref="form4" />
    <eCompanyForm ref="form5" />
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container">
          <div class="cont-search">
            <span>地址：</span>
            <el-input v-model="form.address" class="input-desc" placeholder="请输入用户地址" />
            <el-button type="primary" class="add" icon="el-icon-search" @click="searchHandler()">搜索</el-button>
            <el-button type="primary" class="add" icon="el-icon-refresh-left" @click="resetHandler()">重置</el-button>
            <!-- <el-checkbox v-model="isSort" style="margin-left: 20px;" @change="searchHandler()">倒序</el-checkbox> -->
            <el-radio-group v-model="sortType" style="margin-left: 20px;" @change="searchHandler()">
              <el-radio :label="0">默认排序</el-radio>
              <el-radio :label="1">余额排序</el-radio>
              <el-radio :label="2">土地排序</el-radio>
            </el-radio-group></div>

        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="userId" align="center" width="100" />
          <el-table-column label="钱包地址" prop="address" align="center" width="200" />
          <el-table-column label="级别" prop="level" align="center" />
          <el-table-column label="当日提现最大值" prop="maxWithdraw" align="center" />
          <el-table-column label="锁定" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lock==='1'?'锁定':'未锁定' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许全网布置土地" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.canLand==='1'?'允许':'不允许' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许全网施肥" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.canPlayAdd==='1'?'允许':'不允许' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许出租土地" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.canRent==='1'?'允许':'不允许' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许上架土地" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.canSell==='1'?'允许':'不允许' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许售卖种子土地" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.canSellProp==='1'?'允许':'不允许' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许全局使用铲子" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.canPlaySix==='1'?'允许':'不允许' }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="上级分红" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lockReward==='1'?'禁止':'未禁止' }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="biw余额" prop="giw" align="center" /> -->
          <!-- <el-table-column label="biw充值余额" prop="giwTwo" align="center" /> -->
          <!-- <el-table-column label="giw余额" prop="git" align="center" /> -->
          <el-table-column label="土地数量" prop="landCount" align="center" />
          <el-table-column label="usdt余额" prop="usdtTwo" align="center" />
          <el-table-column label="ispay余额" prop="git" align="center" />
          <el-table-column label="新ispay余额" prop="gitNew" align="center" />
          <el-table-column label="公司" prop="one" align="center" />
          <el-table-column label="社区" prop="two" align="center" />
          <el-table-column label="挖矿" prop="three" align="center" />
          <!-- <el-table-column label="可提usdt" prop="usdtTwo" align="center" /> -->
          <el-table-column label="邻居数" prop="recommendTotal" align="center" />
          <!-- <el-table-column label="业绩" prop="recommendTotalBiw" align="center" /> -->
          <el-table-column label="邀请收益" prop="recommendTotalReward" align="center" />
          <el-table-column label="L1业绩" prop="recommendTotalBiwOne" align="center" />
          <el-table-column label="邀请收益" prop="recommendTotalRewardOne" align="center" />
          <el-table-column label="L2业绩" prop="recommendTotalBiwTwo" align="center" />
          <el-table-column label="邀请收益" prop="recommendTotalRewardTwo" align="center" />
          <el-table-column label="L3业绩" prop="recommendTotalBiwThree" align="center" />
          <el-table-column label="邀请收益" prop="recommendTotalRewardThree" align="center" />
          <el-table-column label="粮仓质押数量" prop="myStakeGit" align="center" />
          <el-table-column label="果实放大器质押" prop="myStakeGetTotal" align="center" />

          <el-table-column
            fixed="right"
            width="250"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" class="btn-option" size="mini" @click="detailHandler(scope.row)">查看下级</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setBalanceHandler(scope.row)">设置余额</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCompanyHandler(scope.row)">设置公司社区挖矿</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setLevelHandler(scope.row)">设置级别</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setWithdrawMaxHandler(scope.row)">设置当日提现最大值</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setUserAddrHandler(scope.row)">设置用户地址</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="landHandler(scope.row)">土地</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="bagHandler(scope.row)">背包</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setLockHandler(scope.row)">{{ scope.row.lock==='1'?'解锁':'锁定' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setLockOnlyHandler(scope.row)">{{ scope.row.lock==='1'?'解锁个人':'锁定个人' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCanLandHandler(scope.row)">{{ scope.row.canLand==='1'?'取消全网布置土地':'允许全网布置土地' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCanPlayAddHandler(scope.row)">{{ scope.row.canPlayAdd==='1'?'取消全网施肥':'允许全网施肥' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCanRentHandler(scope.row)">{{ scope.row.canRent==='1'?'取消出租土地':'允许出租土地' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCanSellHandler(scope.row)">{{ scope.row.canSell==='1'?'取消上架土地':'允许上架土地' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCanSellSeedHandler(scope.row)">{{ scope.row.canSellProp==='1'?'禁止售卖种子土地':'允许售卖种子土地' }}</el-button>
              <el-button type="primary" class="btn-option" size="mini" @click="setCanUseShovelHandler(scope.row)">{{ scope.row.canPlaySix==='1'?'禁止全局使用铲子':'允许全局使用铲子' }}</el-button>
              <!-- <el-button type="primary" class="btn-option" size="mini" @click="setRewardLockHandler(scope.row)">{{ scope.row.lockReward==='1'?'允许给上级分红':'禁止给上级分红' }}</el-button> -->
              <!-- <el-button type="primary" class="btn-option" size="mini" @click="buyHandler(scope.row)">认购信息</el-button> -->
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
import eForm from './editDialog.vue'
import eLevelForm from './editLevelDialog.vue'
import eAddrForm from './editAddrDialog.vue'
import eMaxForm from './editWithdrawDialog.vue'
import eCompanyForm from './editCompanyDialog.vue'
import initList from '@/mixins/initList'
import { userList, setLock, setLockReward, setCanLand, setCanPlayAdd, setCanRent, setCanSell, setCanSellSeed, setCanUseShovel } from '@/api/orderModel'

const default_form = {
  address: ''
}
export default {
  name: 'SearchList',
  components: {
    eForm, eLevelForm, eMaxForm, eAddrForm, eCompanyForm
  },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      list: [],
      isSort: false,
      sortType: 0,
      totalCount: 0,
      totalArea: 0,
      totalPrice: 0
    }
  },
  created() {
    this.$nextTick(() => {
      this.initList()
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
    detailHandler: function(e) {
      console.log(e.userId)
      this.$router.push({ path: '/detail2', query: { id: e.userId }})
    },
    setBalanceHandler: function(item) {
      this.$refs.form.address = item.address
      this.$refs.form.dialog = true
    },
    setLevelHandler: function(item) {
      this.$refs.form2.address = item.address
      this.$refs.form2.vip = item.level
      this.$refs.form2.dialog = true
    },
    setWithdrawMaxHandler: function(item) {
      this.$refs.form3.address = item.address
      this.$refs.form3.maxWithdraw = item.maxWithdraw || 0
      this.$refs.form3.dialog = true
    },
    setUserAddrHandler: function(item) {
      this.$refs.form4.address = item.address
      this.$refs.form4.dialog = true
    },
    setCompanyHandler: function(item) {
      this.$refs.form5.address = item.address
      this.$refs.form5.dialog = true
    },
    setLockHandler: function(item) {
      const address = item.address
      const onlyAddress = 0
      if (item.lock === '1') {
        this.changeLock(address, '0', onlyAddress)
      } else {
        this.changeLock(address, '1', onlyAddress)
      }
    },
    setLockOnlyHandler: function(item) {
      const address = item.address
      const onlyAddress = 1
      if (item.lock === '1') {
        this.changeLock(address, '0', onlyAddress)
      } else {
        this.changeLock(address, '1', onlyAddress)
      }
    },
    setCanLandHandler: function(item) {
      const address = item.address
      if (item.canLand === '1') {
        this.changeCanLand(address, '0')
      } else {
        this.changeCanLand(address, '1')
      }
    },
    setCanPlayAddHandler: function(item) {
      const address = item.address
      if (item.canPlayAdd === '1') {
        this.changeCanPlay(address, '0')
      } else {
        this.changeCanPlay(address, '1')
      }
    },
    setCanRentHandler: function(item) {
      const address = item.address
      if (item.canRent === '1') {
        this.changeCanRent(address, '0')
      } else {
        this.changeCanRent(address, '1')
      }
    },
    setCanSellHandler: function(item) {
      const address = item.address
      if (item.canSell === '1') {
        this.changeCanSell(address, '0')
      } else {
        this.changeCanSell(address, '1')
      }
    },
    setCanSellSeedHandler: function(item) {
      const address = item.address
      if (item.canSellProp === '1') {
        this.changeCanSellSeed(address, '0')
      } else {
        this.changeCanSellSeed(address, '1')
      }
    },
    setCanUseShovelHandler: function(item) {
      const address = item.address
      if (item.canPlaySix === '1') {
        this.changeCanUseShovel(address, '0')
      } else {
        this.changeCanUseShovel(address, '1')
      }
    },
    setRewardLockHandler: function(item) {
      const address = item.address
      if (item.lockReward === '1') {
        this.changeRewardLock(address, '0')
      } else {
        this.changeRewardLock(address, '1')
      }
    },
    landHandler: function(e) {
      this.$router.push({ path: '/land', query: { address: e.address }})
    },
    bagHandler: function(e) {
      this.$router.push({ path: '/backpack', query: { address: e.address }})
    },
    buyHandler: function(e) {
      this.$router.push({ path: '/buy', query: { address: e.address }})
    },
    changeLock(address, lock, onlyAddress) {
      setLock({
        address, lock, onlyAddress
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeCanLand(address, num) {
      setCanLand({
        address, num
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeCanPlay(address, num) {
      setCanPlayAdd({
        address, num
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeCanRent(address, num) {
      setCanRent({
        address, num
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeCanSell(address, num) {
      setCanSell({
        address, num
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeCanSellSeed(address, num) {
      setCanSellSeed({
        address, num
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeCanUseShovel(address, num) {
      setCanUseShovel({
        address, num
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    changeRewardLock(address, lockReward) {
      setLockReward({
        address, lockReward
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.initList()
      })
    },
    initList(page) {
      const orderType = this.sortType === 1 ? '1' : '0'
      const orderTypeTwo = this.sortType === 2 ? '1' : '0'
      userList({
        page: page || this.page,
        address: this.form.address,
        orderType: orderType,
        orderTypeTwo: orderTypeTwo

      }).then(res => {
        this.list = res.users
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
