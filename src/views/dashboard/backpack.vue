<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container" />
        <!--表格渲染-->
        <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="id" align="center" width="100" />
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type==='1'?'种子':'道具' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              <span>{{ listType[(parseInt(scope.row.num)-1)].label }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status==='4'?'出售中':'默认' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剩余次数" prop="useNum" align="center" />
          <el-table-column label="产出量" prop="outMax" align="center" />
          <el-table-column label="成长时间" prop="time" align="center" />
          <el-table-column label="售价" prop="amount" align="center" />

        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-size="size"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import initList from '@/mixins/initList'
import { userBackList } from '@/api/orderModel'

export default {
  name: 'Backpack',
  components: {
  },
  mixins: [initList],
  data() {
    return {
      listType: [
        { type: '1', label: '西红柿' },
        { type: '2', label: '哈密瓜' },
        { type: '3', label: '葡萄' },
        { type: '4', label: '橘子树' },
        { type: '5', label: '芒果树' },
        { type: '6', label: '苹果树' },
        { type: '7', label: '柚子' },
        { type: '8', label: '椰子树' },
        { type: '9', label: '枣椰树' },
        { type: '10', label: '红杉' },
        { type: '11', label: '化肥' },
        { type: '12', label: '水' },
        { type: '13', label: '手套' },
        { type: '14', label: '除虫剂' },
        { type: '15', label: '铲子' },
        { type: '16', label: '盲盒' },
        { type: '17', label: '地契' }
      ]
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
      userBackList({
        address: address
        // page: page || this.page

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
.btn-option {
  margin-bottom: 5px;
}
</style>
