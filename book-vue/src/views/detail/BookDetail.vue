<template>
  <div style="width: 80%;margin: auto">
    <div>
      <div class="img" style="width: 400px;height: 620px;position: fixed">
        <el-image :src="book.imgUrl" style="width: 100%"></el-image>
      </div>
      <div style="margin-left: 450px; flex: 1;">
        <el-card style="height: 570px">
          <el-form label-width="80px">
            <el-form-item label="商品名称">{{ book.name }}</el-form-item>
            <el-form-item label="商品类别">{{ book.category }}</el-form-item>
            <el-form-item label="商品作者">{{ book.author }}</el-form-item>
            <el-form-item label="商品描述">{{ book.description }}</el-form-item>
            <el-form-item label="商品价格"><span style="color: red">{{ book.price }}</span></el-form-item>
            <el-form-item label="发布时间"><span>{{ book.updateTime }}</span></el-form-item>
            <el-form-item label="商品状态"><span>{{statusFormatter(book)}}</span></el-form-item>
            <div>
              <el-button style="background: red; font-size: 16px; color: white; padding: 10px; margin-left: 5px"
                         @click="addCart">加入购物车
              </el-button>
            </div>

            <div style="margin-top: 20px; font-size: 22px; color: #888">
              温馨提示
              <div>
                ·支持7天无理由退货·谨防用电安全隐患，请依照产品说明书使用此类工具并采取必要人身防护措施，日常置于儿童无法触及处。
              </div>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>

    <div style="margin: 10px 0">
      <el-card>
        <div style="margin: 10px 0; font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 10px">商品评价</div>
        <div v-for="item in comments" :key="item.id" style="margin: 10px 0">
          <div>
            <el-image style="width: 30px; height: 30px; border-radius: 50%" :src="item.avatar"></el-image>
            <span style="margin-left: 5px">{{ item.user }}</span>
            <span style="margin-left: 20px; color: #666; font-size: 14px">{{ item.comment }}</span></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "Detail",
  data() {
    let bookId = Number(this.$route.query.id)
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      book: {},
      bookId: bookId,
      buyNum: 1,
      comments: []
    }
  },
  created() {

    this.getBook()


    // this.request.get('/orderItem/comment/' + this.bookId).then(res => this.comments = res.data)
  },
  methods: {
    statusFormatter(row, column){
      const status = row.status
      if (status === 1) {
        return '待售'
      } else if (status === 2) {
        return '已售'
      } else if (status === 3) {
        return '下架'
      }
    },
    getBook() {
      let data = new FormData;
      data.append("bookId", this.bookId)
      this.$axios({
        method: "post",
        url: "/book/getBookById",
        data: data
      }).then(res => {
        this.book = res.data.result
        debugger
      }).catch(err => {
      })
    },
    addCart() {
      this.request.post('/cart', {goodsId: this.bookId, num: this.buyNum, userid: this.user.id}).then(res => {
        if (res.code === '200') {
          this.$message.success('加入购物车成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>