<template>
  <el-dialog
    :visible.sync="dialog"
    :close-on-click-modal="false"
    :before-close="cancelHandler"
    title="删除消息"
    append-to-body
    width="560px"
  >
    <div class="cont-menu">
      <span class="name">中文：</span>
      <el-input v-model="form.content" class="input-desc" :disabled="true" placeholder="请输入" />
    </div>
    <div class="cont-menu">
      <span class="name">英文：</span>
      <el-input v-model="form.contentTwo" class="input-desc" :disabled="true" placeholder="请输入" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取消</el-button>
      <el-button type="danger" :loading="isLoading" @click="submitHandler">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { delAdminMsg } from '@/api/orderModel'
const default_form = {
  content: '',
  contentTwo: ''
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
      if (form.id) {
        this.edit(form.id)
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

    edit: async function(id) {
      const data = { id }
      this.isLoading = true
      const res = await delAdminMsg(data)
      this.isLoading = false
      if (res.status === 'ok') {
        this.$message({
          message: '删除成功',
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
