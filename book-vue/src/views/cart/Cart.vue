<template>
  <div style="margin: 10px 0">
    <div>
      <nav-menu class="nav-menu" style="height: auto"></nav-menu>
    </div>
    <el-table :data="tableData" stripe size="medium"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品单价"></el-table-column>
      <el-table-column prop="imgUrl" label="图片">
        <template v-slot="scope">
          <el-image :src="scope.row.imgUrl" style="width: 100px; height: 100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="商品状态" :formatter="statusFormatter"></el-table-column>
            <el-table-column prop="publisher" label="发布者"></el-table-column>

      <el-table-column label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-delete"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="orderButton" >
     <div style="color: red;"> 总价 ￥{{ totalPrice }}</div>
      <div style="margin: 10px 0">
        <el-button style="background-color: red; color: white; font-size: 18px; padding: 10px 20px" @click="adaOrder">下单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "xijs";
import NavMenu from "@/common/NavMenu.vue";

export default {
  name: "Cart",
  components: {NavMenu},
  data() {
    return {
      tableData: [],
      total: 0,
      name: "",
      multipleSelection: [],
      totalPrice: 0
    }
  },
  created() {
    this.load()
  },
  methods: {
    statusFormatter(row, column){
      const status = row.status
      if (status == 1) {
        return '待售'
      } else if (status == 2) {
        return '已售'
      } else if (status == 3) {
        return '下架'
      }
    },
    adaOrder() {
      if (!this.multipleSelection.length) {
        this.$message.error("下单失败，未选择商品")
        return
      }
      debugger
      this.$axios({
        url: '/cart/orderCart',
        method: 'post',
        headers: {
          'accessToken': store.get("accessToken").value,
        },
        data: this.multipleSelection
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success("下单成功")
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    load() {
        this.$axios({
            url: '/cart/listCart',
            method: 'post',
            headers: {
                'accessToken': store.get("accessToken").value,
            },
        }).then(res => {
            this.tableData = res.data
        })
    },
    del(id) {
      let data = new FormData();
      data.set('id', id)
      this.$axios({
        url: '/cart/deleteCart',
        method: 'post',
        headers: {
          'accessToken': store.get("accessToken").value,
        },
        data: data
      }).then(res => {
        this.load()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      debugger
      this.$axios({
        url: '/cart/cal',
        method: 'post',
        data: val
      }).then(res => {
        this.totalPrice = res.data.result
      })
    },

  }
}
</script>


<style>
/*将当前所有内容显示到中间*/
.el-table {
  margin: 0 auto;
  width: 80%;
  top: 5px;
  text-align: center;
  position: relative;
}
.nav-menu {
  width: 1080px;
  position: relative;
  top: -10px;
  left: 20px;
  z-index: 0;
}
.orderButton {
  width: 80%;
  position: relative;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: white;
  text-align: right;
  border-radius: 10px
}
</style>
