<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container" />
        <el-tree
          :data="treeData"
          :props="defaultProps"
          lazy
          :load="loadNode"
          node-key="id"
          highlight-current
        />
        <!--表格渲染-->
        <!-- <el-table v-loading="loading" :data="list" size="small" empty-text="暂无数据" style="width: 100%; margin-top: 20px;">
          <el-table-column label="ID" prop="userId" align="center" width="100" />
          <el-table-column label="钱包地址" prop="address" align="center" width="200" />
          <el-table-column label="时间" prop="createdAt" align="center" />
          <el-table-column label="业绩" prop="recommendTotalBiw" align="center" />
          <el-table-column
            fixed="right"
            width="150"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" class="btn-option" size="mini" @click="detailHandler(scope.row)">查看下级</el-button>
            </template>
          </el-table-column>
        </el-table> -->
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
import initList from '@/mixins/initList'
import { detailList } from '@/api/orderModel'

export default {
  name: 'UserDetail',
  components: {
  },
  mixins: [initList],
  data() {
    return {
      treeData: [], // 根节点初始化为空
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf'
      }
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
    // 节点展开时触发
    loadNode(node, resolve) {
      const userId = node.level === 0 ? node.id || 0 : node.data.id // 根节点为0或者根节点id

      this.loading = true

      detailList({ userId }).then(res => {
        const children = (res.users || []).map(item => ({
          id: item.userId,
          label: `地址：${item.address} 时间：${item.createdAt}` // 显示文本
          // isLeaf: !item.hasChild // 根据接口返回判断是否有子节点
        }))

        resolve(children)
        this.loading = false
      }).catch(() => {
        resolve([])
        this.loading = false
      })
    },
    initList() {
      const id = this.$route.query.id || ''
      detailList({
        userId: id
        // page: page || this.page

      }).then(res => {
        this.treeData = (res.users || []).map(item => ({
          id: item.userId,
          label: `地址：${item.address} 时间：${item.createdAt}` // 显示文本
          // isLeaf: !item.hasChild // 根据接口返回判断是否有子节点
        }))
        // this.list = res.users
        this.total = parseInt(res.count) || 0

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
