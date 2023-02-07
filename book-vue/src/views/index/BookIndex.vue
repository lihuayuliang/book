<template>

  <el-container >
    <el-header>
      <nav-menu class="nav-menu" style="height: auto" @searchbar="searchBook"></nav-menu>
    </el-header>
    <el-aside style="width: 200px;margin-top: 20px" >
      <SideMenu @indexSelect="listByCategory"></SideMenu>
    </el-aside>
    <el-main>
      <books class="books-area" ref="booksArea" @SelectIndex="listByCategory"></books>
    </el-main>
<!--    在浏览最多上面添加-->
      <!--          展示5条浏览最多和收藏最多的书籍，显示图片和书籍名和价格和收藏数和浏览量-->
      <div class="mostView-books" style="">
        <span>浏览最多</span>
        <el-card class="box-card" v-for="book in mostViewedBooks" :key="book.id" :body-style="{ padding: '0px' }">
          <el-row>
            <el-col :span="8">
              <img :src="book.imgUrl" style="width: 50px;height: 69px">
            </el-col>
            <el-col :span="16">
              <div id="book-size">
                <span >{{book.name}}</span>
                <br>
                <span>价格：{{book.price}}元</span>
                <br>
                <span>浏览量：{{book.viewCount}}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
<!--      收藏最多-->
      <div class="mostCollect-books">
        <span>收藏最多</span>
        <el-card class="box-card" v-for="book in mostCollectedBooks" :key="book.id" :body-style="{ padding: '0px' }">
          <el-row>
            <el-col :span="8">
              <img :src="book.imgUrl" style="width: 50px;height: 69px">
            </el-col>
            <el-col :span="16">
              <div id="book-size">
                <span >{{book.name}}</span>
                <br>
                <span>价格：{{book.price}}元</span>
                <br>
                <span>收藏数：{{book.collectionCount}}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
  </el-container>
</template>

<script>
  import SideMenu from './SideMenu'
  import Books from './Books'
  import NavMenu from '../../common/NavMenu'
  import global from "@/assets/global.js";
  import {store} from "xijs";

  export default {
    name: 'AppLibrary',
    components: {Books, SideMenu,NavMenu},
    data(){
      return{
        mostViewedBooks: [],
        mostCollectedBooks: [],
        pageNum: 1,
        pageSize: 24,
      }
    },
    mounted: function () {
      this.loadUserInfo()
      this.getMostViewedBooks()
      this.getMostCollectedBooks()
    },
    methods: {
      searchBook(book){
        debugger
        this.$refs.booksArea.books = book.list
        this.$refs.booksArea.total = book.total
        this.$refs.booksArea.updateDuration()
      },
      listByCategory (index) {
        debugger
        let data =new FormData();
        data.append('pageNum',global.pageNum,);
        data.append('pageSize',this.pageSize);
        data.append('categoryId',parseInt(index));
        this.$axios({
          method: "post",
          url: "/book",
          data: data
      }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$refs.booksArea.books = resp.data.result.list
            this.$refs.booksArea.total = resp.data.result.total
            this.$refs.booksArea.updateDuration()
          }
        })
      },
      getMostViewedBooks() {
        this.$axios({
          method: "get",
          url:'book/mostViewed'
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.mostViewedBooks = resp.data.result
          }
        })
      },
      getMostCollectedBooks() {
        this.$axios({
          method: "get",
          url:'book/mostCollected'
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.mostCollectedBooks = resp.data.result
          }
        })
      },
    //   加载用户信息
      loadUserInfo() {
        let token=store.get("accessToken").value;
        console.log(token);
      }
    }
  }
</script>

<style>
  body{
    background-color: #f2f2f2;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .books-area {
    position: absolute;
    left: 235px;
    width: 1350px;
    margin-left: 40px;
    margin-right: auto;
  }
  .mostView-books {
    position: absolute;
    left: 1670px;
    width: 200px;
    top:100px;

  }
  .mostCollect-books {
    position: absolute;
    left: 1670px;
    top: 490px;
    width: 200px;

  }
  .box-card {
  /*修改该地方整体大小*/
    width: 180px;
    margin-top: 5px;
    height: 68px;
  }
  #book-size{
    font-size: 16px;
  }
</style>
