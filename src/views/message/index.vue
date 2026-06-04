<template>
  <div class="app-container">
    <!--form 组件-->
    <eForm ref="form" />
    <eForm2 ref="form2" />
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container">
          <div class="cont-add">
            <el-button type="primary" class="submit" @click="addHandler()">添加</el-button>
          </div>
        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="id" align="center" width="200" />
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status==='1'?'已删除':'已展示' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="中文" prop="content" align="center" />
          <el-table-column label="英文" prop="contentTwo" align="center" />

          <el-table-column
            fixed="right"
            width="150"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" class="btn-option" size="mini" @click="delHandler(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          :total="total"
          :current-page="page"
          :page-size="size"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"
        /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eForm from './editDialog.vue'
import eForm2 from './delDialog.vue'
import initList from '@/mixins/initList'
import { adminMsgList } from '@/api/orderModel'

const default_form = {
  address: ''
}
export default {
  name: 'MessageList',
  components: {
    eForm, eForm2
  },
  mixins: [initList],
  data() {
    return {
      form: JSON.parse(JSON.stringify(default_form)),
      list: [],
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
    addHandler: function() {
      this.$refs.form.dialog = true
    },
    delHandler: function(item) {
      this.$refs.form2.form = JSON.parse(JSON.stringify(item))
      this.$refs.form2.dialog = true
    },
    initList(page) {
      adminMsgList({
        page: page || this.page
      }).then(res => {
        this.list = res.recordList
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
  .cont-add {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
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
