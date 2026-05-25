<template>
  <el-dialog
    :visible.sync="dialog"
    :close-on-click-modal="false"
    :before-close="cancelHandler"
    title="编辑土地"
    append-to-body
    width="560px"
  >
    <div class="cont-menu">
      <span class="name">等级：</span>
      <el-input v-model="form.level" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">最大增产率：</span>
      <el-input v-model="form.outPutRateMax" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">最小增产率：</span>
      <el-input v-model="form.outPutRateMin" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">最大肥沃度：</span>
      <el-input v-model="form.maxHealth" class="input-desc" type="number" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">每次消耗产率：</span>
      <el-input v-model="form.perHealth" class="input-desc" type="number" placeholder="请输入" />
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
import { landEdit } from '@/api/orderModel'
const default_form = {
  level: '',
  outPutRateMax: '',
  outPutRateMin: '',
  maxHealth: '',
  perHealth: ''
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
      if (form.level && form.outPutRateMax && form.outPutRateMin && form.maxHealth && form.perHealth) {
        this.edit(parseInt(form.level), parseInt(form.outPutRateMax), parseInt(form.outPutRateMin), parseInt(form.maxHealth), parseInt(form.perHealth))
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

    edit: async function(level, outPutRateMax, outPutRateMin, maxHealth, perHealth) {
      const data = { level, outPutRateMax, outPutRateMin, maxHealth, perHealth }
      this.isLoading = true
      const res = await landEdit(data)
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
