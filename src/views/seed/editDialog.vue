<template>
  <el-dialog
    :visible.sync="dialog"
    :close-on-click-modal="false"
    :before-close="cancelHandler"
    title="编辑种子"
    append-to-body
    width="560px"
  >
    <div class="cont-menu">
      <span class="name">最大产出：</span>
      <el-input v-model="form.outMaxAmount" class="input-desc" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">最小产出：</span>
      <el-input v-model="form.outMinAmount" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">成熟时间：</span>
      <el-input v-model="form.outOverTime" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">盲盒开概率(万分之)：</span>
      <el-input v-model="form.rate" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <!-- <div class="cont-menu">
      <span class="name">是否可以跳转：</span>
      <el-radio-group v-model="form.type">
        <el-radio :label="1">跳转</el-radio>
        <el-radio :label="2">不跳转</el-radio>
      </el-radio-group>
    </div> -->

    <!-- <el-divider /> -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取消</el-button>
      <el-button type="primary" :loading="isLoading" @click="submitHandler">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { seedEdit } from '@/api/orderModel'
const default_form = {
  seedId: '',
  outMaxAmount: '',
  outMinAmount: '',
  outOverTime: '',
  rate: ''
}
export default {
  name: '',
  components: {
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
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
      const form = this.form
      if (form.seedId && form.outMaxAmount && form.outMinAmount && form.outOverTime && form.rate) {
        this.edit(parseInt(form.seedId), parseInt(form.outMaxAmount), parseInt(form.outMinAmount), parseInt(form.outOverTime), parseInt(form.rate))
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

    edit: async function(seedId, outMaxAmount, outMinAmount, outOverTime, rate) {
      const data = { seedId, outMaxAmount, outMinAmount, outOverTime, rate }
      this.isLoading = true
      const res = await seedEdit(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
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
