<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="list-menu">
          <div class="cont-menu">
            <span class="name">价格(USDT)：</span>
            <el-input v-model="amount" type="number" class="input-desc" placeholder="请输入价格" />
          </div>
          <div class="cont-menu">
            <span class="name">一口价：</span>
            <el-input v-model="amountTwo" type="number" class="input-desc" placeholder="请输入一口价" />
          </div>
          <div class="cont-land">
            <div class="cont-level">
              <span class="name">土地等级:</span>
              <el-select v-model="selectLand" placeholder="请选择">
                <el-option
                  v-for="item in landList"
                  :key="item.level"
                  :label="item.name"
                  :value="item.level"
                />
              </el-select>
            </div>
            <div class="cont-date">
              <span class="name">上架小时数:</span>
              <el-input-number v-model="limit" :min="1" :max="100000" label="" />
              <span class="name"> 小时</span>
            </div>
          </div>
          <div class="cont-add">
            <el-button type="primary" class="submit" @click="submitHandler()">确定</el-button>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import initList from '@/mixins/initList'
import { setBuyLand } from '@/api/orderModel'

const default_form = {
}
export default {
  name: 'Auction',
  components: {
  },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      amount: '',
      amountTwo: '',
      limit: 1,
      address: '',
      selectLand: 1,
      landList: [
        { level: 1, name: '白土地' },
        { level: 2, name: '黄土地' },
        { level: 3, name: '棕土地' },
        { level: 4, name: '紫土地' },
        { level: 5, name: '青土地' },
        { level: 6, name: '黑土地' },
        { level: 7, name: '红土地' },
        { level: 8, name: '褐土地' },
        { level: 9, name: '银土地' },
        { level: 10, name: '金土地' }
      ]

    }
  },
  created() {
    this.$nextTick(() => {
    })
  },
  mounted() {
  },
  methods: {
    resetHandler: function() {
      this.form = JSON.parse(JSON.stringify(default_form))
    },
    submitHandler: function() {
      if ((!this.amount) || (!this.amountTwo)) {
        this.$message({
          message: '请填写完整信息',
          type: 'warning'
        })
        return
      }
      this.setAuction()
    },

    setAuction: async function() {
      const amount = this.amount
      const amountTwo = this.amountTwo
      const limit = this.limit
      const level = this.selectLand
      const data = { amount, amountTwo, limit, level }
      this.isLoading = true
      const res = await setBuyLand(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
      }
    }

  }
}
</script>
<style lang='scss' scoped>
.el-avatar{
  background: #ffffff;
}
.list-menu {
  display: flex;
  flex-direction: column;
  .item-data {
    display: flex;
    flex-direction: column;
    border: 1px solid #333;
    border-radius: 20px;
    padding: 10px 0;
    margin-bottom: 10px;
  }
  .title {
    width: 100%;
    text-align: center;
    color: #000;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .cont-menu {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 500px;

    .name {
      text-align: center;
      margin-right: 10px;
      color: #000;
    }
    .input-desc {
      flex: 1;
      margin-right: 80px;
    }
    .notice {
      color: red;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
  .cont-tab {
    margin-left: 50px;
    margin-top: 30px;
  }
  .cont-land {
    display: flex;
    flex-direction: column;
    .cont-level {
      margin-top: 20px;
      .name {
        margin-right: 10px;
      }
    }
    .cont-date {
      margin-top: 20px;
      .name {
        margin-right: 20px;
      }
    }
    .cont-allow {
      margin-top: 20px;
    }
  }
  .cont-add {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .submit {
      align-self: flex-start;
      margin-left: 30px;
      margin-top: 30px;
    }
  }
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
