<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="list-menu">
          <div class="cont-menu">
            <span class="name">地址：</span>
            <el-input v-model="address" type="textarea" rows="8" class="input-desc" placeholder="请输入用户地址" />
          </div>
          <div class="cont-tab">
            <el-radio-group v-model="sendType">
              <el-radio :label="1">土地</el-radio>
              <el-radio :label="2">种子</el-radio>
              <el-radio :label="3">道具</el-radio>
            </el-radio-group>
          </div>
          <div v-if="sendType === 1" class="cont-land">
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
              <span class="name">有效期:</span>
              <el-input-number v-model="landDays" :min="1" :max="10000" label="" />
              <span class="name"> 天</span>
            </div>
            <div class="cont-allow">
              <el-checkbox v-model="landOne">允许出售</el-checkbox>
              <el-checkbox v-model="landTwo">允许出租</el-checkbox>
              <el-checkbox v-model="landThree">允许动静态收益</el-checkbox>
            </div>
          </div>
          <div v-if="sendType === 2" class="cont-land">
            <div class="cont-level">
              <span class="name">种子类型:</span>
              <el-select v-model="selectSeed" placeholder="请选择">
                <el-option
                  v-for="item in seedList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <div v-if="sendType === 3" class="cont-land">
            <div class="cont-level">
              <span class="name">道具类型:</span>
              <el-select v-model="selectTool" placeholder="请选择">
                <el-option
                  v-for="item in toolList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <div class="cont-menu">
            <span class="name">数量：</span>
            <el-input-number v-model="total" :min="1" :max="9999" @change="handleChange" />
          </div>
          <div class="cont-add">
            <el-button type="primary" class="submit" @click="submitHandler()">添加</el-button>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import initList from '@/mixins/initList'
import { setLand, setSeed, setTool } from '@/api/orderModel'

const default_form = {
}
export default {
  name: 'Send',
  components: {
  },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      address: '',
      total: 1,
      sendType: 1,
      selectLand: 1,
      landDays: 1,
      landOne: true,
      landTwo: true,
      landThree: true,
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
      ],
      selectSeed: 1,
      seedList: [
        { id: 1, name: '西红柿' },
        { id: 2, name: '哈密瓜' },
        { id: 3, name: '葡萄' },
        { id: 4, name: '橘子树' },
        { id: 5, name: '芒果树' },
        { id: 6, name: '苹果树' },
        { id: 7, name: '柚子' },
        { id: 8, name: '椰子树' },
        { id: 9, name: '枣椰树' },
        { id: 10, name: '红杉' }
      ],
      selectTool: 11,
      toolList: [
        { id: 11, name: '化肥' },
        { id: 12, name: '水' },
        { id: 13, name: '手套' },
        { id: 14, name: '除虫剂' },
        { id: 15, name: '铲子' },
        { id: 16, name: '盲盒' },
        { id: 17, name: '地契' }
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
      if (!this.address) {
        this.$message({
          message: '请填写完整信息',
          type: 'warning'
        })
        return
      }
      if (this.sendType === 1) {
        this.sendLand()
      } else if (this.sendType === 2) {
        this.sendSeed()
      } else if (this.sendType === 3) {
        this.sendTool()
      }
    },
    sendLand: async function() {
      const address = this.address
      const total = this.total
      const level = this.selectLand
      const one = this.landOne ? '1' : ''
      const two = this.landTwo ? '1' : ''
      const four = this.landThree ? '1' : ''
      const limit = this.landDays * 24 * 60 * 60
      const data = { address, total, level, one, two, four, limit }
      this.isLoading = true
      const res = await setLand(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '发送成功',
          type: 'success'
        })
      }
    },
    sendSeed: async function() {
      const address = this.address
      const total = this.total
      const seedId = this.selectSeed
      const data = { address, total, seedId }
      this.isLoading = true
      const res = await setSeed(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '发送成功',
          type: 'success'
        })
      }
    },
    sendTool: async function() {
      const address = this.address
      const total = this.total
      const propType = this.selectTool
      const data = { address, total, propType }
      this.isLoading = true
      const res = await setTool(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '发送成功',
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
    width: 900px;

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
