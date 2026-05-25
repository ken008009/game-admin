<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container" />
        <div class="cont-desc">
          <span class="menu">级别：{{ info.level }}</span>
          <span class="menu">认购金额：{{ info.one }}</span>
          <span class="menu">倍率：{{ info.two }}</span>
          <span class="menu">已释放：{{ info.three }}</span>
          <span class="menu">待释放：{{ info.four }}</span>
          <span class="menu">静态：{{ info.five }}</span>
          <span class="menu">直推：{{ info.six }}</span>
          <span class="menu">直推加速：{{ info.seven }}</span>
          <span class="menu">团队：{{ info.eight }}</span>
          <span class="menu">平级：{{ info.nine }}</span>
          <span class="menu">全网：{{ info.ten }}</span>
          <span class="menu">总业绩：{{ info.elven }}</span>
          <span class="menu">直推业绩：{{ info.twelve }}</span>
          <span class="menu">大区业绩：{{ info.thirteen }}</span>
          <span class="menu">小区业绩：{{ info.fourteen }}</span>
          <span class="menu">直推人数：{{ info.recommendNum }}</span>
          <span class="menu">价格：{{ info.price }}</span>
          <span class="menu">biw余额：{{ info.giw }}</span>
          <span class="menu">usdt余额：{{ info.usdt }}</span>
          <span class="menu">激活人数：{{ info.buyNum }}</span>
          <span class="menu">团队人数：{{ info.teamNum }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import initList from '@/mixins/initList'
import { userBuy } from '@/api/orderModel'

export default {
  name: 'Buy',
  components: {
  },
  mixins: [initList],
  data() {
    return {
      info: {}
    }
  },
  watch: {
    '$route'(to, from) {
      // 检查 id 是否变化
      if (to.query.id !== from.query.id) {
        this.initList() // 主动调用数据获取方法
      }
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
    backHandler: function() {
      this.$router.go(-1)
    },
    detailHandler: function(e) {
      console.log(e.userId)
      this.$router.push({ path: '/detail', query: { id: e.userId }})
    },
    initList() {
      const address = this.$route.query.address || ''
      userBuy({
        address: address

      }).then(res => {
        console.log(res)
        this.info = res

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
.list-menu {
  display: flex;
  flex-direction: column;
  width: 700px;
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
    .name {
      width: 150px;
      text-align: center;
      margin-right: 10px;
      color: #999999;
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
  .cont-add {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .submit {
      align-self: flex-end;
    }
  }
}
.head-container {
  display: flex;
  .input-desc {
    margin-right: 30px;
  }
  .add {
    display: inline-block;
    margin: 20px 20px;
  }
}
.cont-desc {
  margin: 20px;
  display: flex;
  flex-direction: column;
  .menu {
    margin-bottom: 10px;
    font-weight: bold;
  }
}
.btn-option {
  margin-bottom: 5px;
}
</style>
