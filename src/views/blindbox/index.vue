<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="list-menu">
          <div class="cont-menu">
            <span class="name">卖出总数：</span>
            <span class="name">{{ info.sellNum }}</span>
          </div>
          <div class="cont-menu">
            <span class="name">当前期数：</span>
            <span class="name">{{ info.term }}</span>
          </div>
          <div class="cont-menu">
            <span class="name">总数：</span>
            <el-input v-model="info.total" type="number" class="input-desc" placeholder="请输入总数" />
          </div>
          <div class="cont-menu">
            <span class="name">价格USDT：</span>
            <el-input v-model="info.amount" type="number" class="input-desc" placeholder="请输入价格" />
          </div>
          <div class="cont-menu">
            <span class="name">起止时间：</span>
            <el-date-picker
              v-model="date"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <div class="cont-add">
            <el-button type="primary" class="submit" @click="submitHandler()">保存本期</el-button>
            <el-button type="primary" class="submit" @click="submitNewHandler()">保存新一期</el-button>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import initList from '@/mixins/initList'
import { blindboxInfo, saveBlindbox } from '@/api/orderModel'

const default_form = {
}
export default {
  name: 'BlindBox',
  components: {
  },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      date: [],
      info: {}

    }
  },
  created() {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  mounted() {
  },
  methods: {
    resetHandler: function() {
      this.form = JSON.parse(JSON.stringify(default_form))
    },
    submitHandler: function() {
      if ((!this.info.amount) || (!this.info.total)) {
        this.$message({
          message: '请填写完整信息',
          type: 'warning'
        })
        return
      }
      this.saveBlind()
    },
    submitNewHandler: function() {
      if ((!this.info.amount) || (!this.info.total)) {
        this.$message({
          message: '请填写完整信息',
          type: 'warning'
        })
        return
      }
      this.saveNewBlind()
    },
    getInfo: async function() {
      this.isLoading = true
      const res = await blindboxInfo({})
      this.isLoading = false
      // if (res.status === 'ok') {
      this.info = res
      const date = [res.start, res.end]
      this.date = date
      // }
    },
    saveBlind: async function() {
      const amount = this.info.amount
      const total = this.info.total
      const start = this.date[0]
      const end = this.date[1]

      const data = { amount, total, start, end }
      this.isLoading = true
      const res = await saveBlindbox(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.getInfo()
      }
    },
    saveNewBlind: async function() {
      const amount = this.info.amount
      const total = this.info.total
      const start = this.date[0]
      const end = this.date[1]
      const newTerm = 1

      const data = { amount, total, start, end, newTerm }
      this.isLoading = true
      const res = await saveBlindbox(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.getInfo()
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
    width: 600px;

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
    align-items: center;
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
