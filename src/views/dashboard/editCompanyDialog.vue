<template>
  <el-dialog
    :visible.sync="dialog"
    :close-on-click-modal="false"
    :before-close="cancelHandler"
    title="设置"
    append-to-body
    width="560px"
  >
    <div class="cont-menu">
      <span class="name">数值：</span>
      <el-input v-model="amt" type="number" class="input-desc" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">种类：</span>
      <el-radio-group v-model="type">
        <el-radio :label="'one'">公司</el-radio>
        <el-radio :label="'two'">社区</el-radio>
        <el-radio :label="'three'">挖矿</el-radio>
      </el-radio-group>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取消</el-button>
      <el-button type="primary" :loading="isLoading" @click="submitHandler">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { addCompanyNum } from '@/api/orderModel'
const default_form = {
  address: ''
}
export default {
  name: '',
  components: {
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      address: '',
      type: 'one',
      amt: '',
      dialog: false,
      isLoading: false
    }
  },
  created() {
    this.$nextTick(() => {

    })
  },
  mounted() {

  },
  methods: {

    submitHandler() {
      if (this.amt && this.type) {
        this.add(parseFloat(this.amt), this.type)
      } else {
        this.$message({
          message: '请填写完整信息',
          type: 'warning'
        })
      }
    },
    cancelHandler() {
      this.dialog = false
      this.form = JSON.parse(JSON.stringify(default_form))
    },

    add: async function(amt, type) {
      this.isLoading = true
      console.log(type)
      const address = this.address
      let res = ''
      if (type === 'one') {
        res = await addCompanyNum({ address, amount: amt, setType: 1 })
      } else if (type === 'two') {
        res = await addCompanyNum({ address, amount: amt, setType: 2 })
      } else if (type === 'three') {
        res = await addCompanyNum({ address, amount: amt, setType: 3 })
      }
      this.isLoading = false
      if (res && res.status === 'ok') {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.amt = ''
        this.address = ''
        this.$parent.initList()
        this.cancelHandler()
      }
    }

  }
}
</script>
<style lang='scss' scoped>
.cont-menu {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .name {
    width: 120px;
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
.detail-box{
  .detail-tietle{
    color: #999999;
  }
  .order-table{
    width: 100%;
    td,th{
      width: 30%;
      text-align: center;
    }
  }
  .attr-style{
    color: #999;
    display: block;
    p{
      margin: 2px;
    }
  }
  .hide{
    visibility:hidden;
  }
}
</style>
