<template>
  <div class="app-container">
    <!--form 组件-->
    <eForm ref="form" />
    <eForm2 ref="form2" />
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container" />
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="id" align="center" width="200" />
          <!-- <template slot-scope="scope">
            <el-button type="primary" class="btn-option" size="mini">{{ scope.$index + 1 }}</el-button>
          </template> -->
          <el-table-column label="名称" prop="name" align="center" />
          <el-table-column label="数值" prop="value" align="center" />

          <el-table-column
            fixed="right"
            width="150"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" class="btn-option" size="mini" @click="editHandler(scope.row, scope.$index)">编辑</el-button>
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
import eForm2 from './editTxtDialog.vue'
import initList from '@/mixins/initList'
import { otherList } from '@/api/orderModel'

const default_form = {
  address: ''
}
export default {
  name: 'OtherList',
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
      seedList: [
        '西红柿',
        '哈密瓜',
        '葡萄',
        '橘子树',
        '芒果树',
        '苹果树',
        '柚子',
        '椰子树',
        '枣椰树',
        '红杉'
      ]
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
    editHandler: function(item, index) {
      if (item.id === '66' || item.id === '67') {
        this.$refs.form2.form = { ...item }
        this.$refs.form2.dialog = true
      } else {
        this.$refs.form.form = { ...item }
        this.$refs.form.dialog = true
      }
    },
    initList(page) {
      otherList({
        page: page || this.page
      }).then(res => {
        this.list = res.list
        this.total = parseInt(res.list.length) || 0

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
