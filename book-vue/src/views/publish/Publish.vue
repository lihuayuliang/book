<template>
  <div class="publish">
    <el-header>
      <nav-menu class="nav-menu" style="height: auto"></nav-menu>
    </el-header>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="formItem" label="图书名称" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="formItem" label="图书作者" >
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item class="formItem" label="图书价格" >
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item class="formItem" label="图书类型" >
          <el-select v-model="form.categoryId" placeholder="请选择分类">
            <el-option  :label="category.name" :value="category.id" v-for="category in categories">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="取货方式" style="position: relative ; top: 100px">-->
<!--          <el-radio-group v-model="form.resource">-->
<!--            <el-radio label="自提"></el-radio>-->
<!--            <el-radio label="送货"></el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <el-form-item class="formItem" label="图书详情" >
          <el-input type="textarea" v-model="form.description" :rows="6"></el-input>
        </el-form-item>
        <el-form-item class="formItem" label="图书图片" prop="fileList" >
          <el-upload
              class="upload-demo"
              ref="upload"
              :limit="1"
              list-type="picture-card"
              action="none"
              :file-list="fileList"
              :on-change="checkType"
              :auto-upload="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish" style="position: absolute;left: 130px;top: 70px">发布</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>


<script>
import NavMenu from '../../common/NavMenu'
import {store} from "xijs";
export default {
  name: "publish",
  components: {
    NavMenu
  },
  data() {
    return {
      form: {
        name: '',
        author: '',
        price: '',
        categoryId: '',
        description: '',
        file: ''
      },
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      categories:[]
    }
  },
  mounted() {
    this.islogin()
    this.getCategories()
  },
  methods:{
      islogin() {
          let token = store.get("accessToken").value
          if (token === '') {
              this.$router.push("/login")
          }
      },
    checkType(file){
      this.form.file = file
    },
    //   获取图书分类
    getCategories() {
      this.$axios({
        url: '/categories',
        method: 'get'
      }).then(resp => {
          this.categories = resp.data
      }).catch(err => {
        console.log(err)
      })
    },
    //   发布图书
    publish() {
      let book = new FormData();
      book.append('name', this.form.name)
      book.append('author', this.form.author)
      book.append('price', this.form.price)
      book.append('categoryId', this.form.categoryId)
      book.append('description', this.form.description)
      book.append('file', this.form.file.raw)
      book.append('accessToken', store.get("accessToken").value)
      debugger
      this.$axios({
        url: '/book/publish',
        method: 'post',
        data: book
      }).then(resp => {
        debugger
        if (resp && resp.data.code === 200) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '发布失败',
            type: 'error'
          })
        }
      }).catch(err => {
          this.$message({
              message: '发布失败',
              type: 'error'
          })
          console.log(err)
      })
    }

  },

}
</script>
<!--完整编写发布页面样式-->
<style scoped>
.formItem {
    position: relative;
    width: 400px;
    top: 30px;
}
.publish {
  width: 100%;
  height: 960px;
  background-color: #f5f5f5;
}
.content {
  /*  边框圆角*/
  border-radius: 10px;
  /*  边框阴影*/
  box-shadow: 0 0 10px #ccc;
  /* 下移*/
  position: relative;
  top: 100px;
  width: 500px;
  height: 670px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
}




</style>