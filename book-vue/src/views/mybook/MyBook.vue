<!--  NaveMenu作为导航栏-->
<!--  我的书架显示(我发布的书籍和我收藏的书籍) -->
<!--  我发布的书籍显示(书籍名称，书籍图片，书籍价格，书籍详情，书籍状态)-->
<!--  我收藏的书籍显示(书籍名称，书籍图片，书籍价格，书籍详情，书籍状态)-->
<template>
    <div class="common-layout">
        <el-container>
            <nav-menu class="nav-menu" style="height: auto"></nav-menu>
            <el-main>
                <div class="shelf-title">
                    <!--        左边显示轮播图，右边显示图书详情并可更改保存-->
                    <div class="shelf-info">
                        <div class="shelf-info-left">
                            <el-carousel height="350px" width="700px" trigger="click">
                                <el-carousel-item v-for="item in banners" :key="item.id">
                                    <img :src="item.imgUrl" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="图书名称" style="position: relative ; top: 50px">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图书作者" style="position: relative ; top: 65px">
                                <el-input v-model="form.author"></el-input>
                            </el-form-item>
                            <el-form-item label="图书价格" style="position: relative ; top: 80px">
                                <el-input v-model="form.price"></el-input>
                            </el-form-item>
                            <el-form-item label="图书类型" style="position: relative ; top: 100px">
                                <el-select v-model="form.categoryId" placeholder="请选择分类">
                                    <el-option :label="category.name" :value="category.id"
                                               v-for="category in categories">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--        <el-form-item label="取货方式" style="position: relative ; top: 100px">-->
                            <!--          <el-radio-group v-model="form.resource">-->
                            <!--            <el-radio label="自提"></el-radio>-->
                            <!--            <el-radio label="送货"></el-radio>-->
                            <!--          </el-radio-group>-->
                            <!--        </el-form-item>-->
                            <el-form-item label="图书详情" style="position: relative ; top: -150px ;left: 500px">
                                <el-input type="textarea" v-model="form.description"></el-input>
                            </el-form-item>
                            <el-form-item label="图书图片" prop="fileList"
                                          style="position: relative ; top: -100px;left: 500px">
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
                                <el-button type="primary" @click="updateBook()"
                                           style="position: absolute;left: 200px;top: -100px">修改保存
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--            显示我发布的所有图书（只显示图片和名称）-->
                    <div class="book-list">
                        <div class="book-item" v-for="book in books" :key="book.id">
                            <div class="book-img">
                                <img :src="book.imgUrl" alt="" @click="DetailBook(book)">
                                <div class="book-name">
                                    {{ book.name }}
                                </div>
                                <!--              书籍状态：显示是否出售  -->
                                <div class="book-status" v-if="book.status===1">
                                    在售
                                </div>
                                <div class="book-status" v-else>
                                    已售
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>


<script>
import NavMenu from "@/common/NavMenu.vue";
import {store} from "xijs";

export default {
    name: "MyBook",
    components: {NavMenu},
    data() {
        return {
            form: {
                name: '',
                author: '',
                price: '',
                categoryId: '',
                description: '',
                file: '',
                id: '',
            },
            books: [],
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            categories: [],
            banners: [],
        }
    },
    mounted() {
        this.islogin()
        this.getCategories()
        this.queryBook()
        this.selectBanner()

    },
    methods: {
        islogin() {
            debugger
            let token = store.get("accessToken").value
            if (token === null) {
                this.$router.push("/login")
            }
        },
        checkType(file) {
            this.form.file = file
        },
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
        //   查询我的图书
        queryBook() {
            let token = store.get("accessToken").value
            let formData = new FormData();
            formData.set('accessToken', token)
            this.$axios({
                url: '/book/myBooks',
                method: 'post',
                data : formData
            }).then(resp => {
                this.books = resp.data.result
            }).catch(err => {
                console.log(err)
            })
        },
        DetailBook(book) {
            debugger
            this.form = book
        },
        //   修改图书
        updateBook() {
            let formData = new FormData();
            formData.append('id', this.form.id)
            formData.append('name', this.form.name)
            formData.append('author', this.form.author)
            formData.append('price', this.form.price)
            formData.append('categoryId', this.form.categoryId)
            formData.append('description', this.form.description)
            formData.append('file', this.form.file.raw)
            debugger
            this.$axios({
                url: '/book/update',
                method: 'post',
                data: formData
            }).then(resp => {
                debugger
                if (resp.data.code === 200 && "该书不存在" !== resp.data.result) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '修改失败',
                        type: 'error'
                    })
                }
            })
        },//   轮播图
        selectBanner() {
            this.$axios({
                url: '/selectBanner',
                method: 'get'
            }).then(resp => {
                this.banners = resp.data
            }).catch(err => {
                console.log(err)
            })
        }
    },


}
</script>

<style scoped>

.nav-menu {
    position: fixed;
    left: 20px;
    z-index: 1;
}

.shelf-title {
    margin-top: 60px;
    margin-left: 20px;
    z-index: -1;
}

.shelf-info {
    display: flex;
    margin-top: 20px;
    z-index: -1;
}

.shelf-info-left {
    position: relative;
    width: 700px;
    height: 350px;
    top: 30px;
    margin-right: 20px;
    z-index: -1;
}


.book-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-right: 15px;
}

.book-item {

    width: 200px;
    height: 300px;
    margin-right: 28px;
    margin-bottom: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
}

.book-img img {
    position: absolute;
    width: 200px;
    height: 270px;
}

.book-name {
    position: relative;
    top: 271px;
}

.book-status {
    position: relative;
    top: 251px;
    text-align: right;
}


</style>