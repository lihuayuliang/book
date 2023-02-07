<template>
  <div>
    <el-row style="height: 720px;">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">
          <span id="pr">书名：{{item.name}}</span>
          <span id="pr">作者：{{item.author}}</span>
        </p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">
          <span id="pr">浏览量：{{item.viewCount}}</span>
          <span id="pr">收藏量：{{item.collectionCount}}</span>
        </p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span id="pr">发布者：{{item.publisher}}</span>
          <span id="pr">分类：{{item.category}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">详情：{{item.description}}</p>
        <el-card style="width: 150px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px;border-radius: 10px;box-shadow: 0 0 10px #ccc;" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.imgUrl" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.name}}</a>
            </div>
          </div>
          <div class="price">{{item.price}}元</div>
          <div class="time">{{item.duration}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row id="pagination" >
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-row>
  </div>

</template>

<script>
  import SearchBar from './SearchBar'
  import global from "@/assets/global.js";


  export default {
    name: 'Books',
    components: {SearchBar},
    data () {
      return {
        books: [],
        total:0,
        pageNum:1,
        pageSize:24,
      }
    },
    mounted: function () {
      this.loadBooks()
    },
    methods: {
      loadBooks () {
        let data =new FormData();
        data.append('pageNum',this.pageNum,);
        data.append('pageSize',this.pageSize);
        data.append('categoryId',0);
        this.$axios({
          method: "post",
          url: "/book",
          data: data
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.books = resp.data.result.list
            this.total = resp.data.result.total
            this.updateDuration()
          }
        })
      },
      searchResult () {
        this.$axios
          .get('/search?keywords=' + this.$refs.searchBar.keywords, {
          }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.books = resp.data.result
          }
        })
      },
      updateDuration:function () {
        let books = this.books;
        for(let i=0; i<books.length; i++){
          //创建问题时候的时间毫秒数
          let updateTime = new Date(books[i].updateTime).getTime();
          //当前时间毫秒数
          let now = new Date().getTime();
          let duration = now - updateTime;
          if (duration < 1000*60){ //一分钟以内
            books[i].duration = "刚刚";
          }else if(duration < 1000*60*60){ //一小时以内
            books[i].duration =
                (duration/1000/60).toFixed(0)+"分钟以前";
          }else if (duration < 1000*60*60*24){
            books[i].duration =
                (duration/1000/60/60).toFixed(0)+"小时以前";
          }else {
            books[i].duration =
                (duration/1000/60/60/24).toFixed(0)+"天以前";
          }
        }
      },
      handleCurrentChange(pageNum) {
        console.log(`当前页: ${pageNum}`);
        global.setPageNum(pageNum)
        debugger
        this.$emit('SelectIndex',global.cagetoryId)
      },
    }
  }
</script>
<style scoped>

  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .price {
    color: #333;

    font-size: 13px;
    text-align: left;
    float: left;
    display:inline;
  }
  
  .time {
    color: #333;
    font-size: 13px;
    text-align: right;
    float: right;
    display:inline;
  }

  #pr{
    float:left;
    width: 50%;
  /*  下移15px*/
  }


  .abstract {
    display: block;
    line-height: 17px;
  }
  #pagination{
    position: absolute;
    top: 760px;
    left: 0;
  }


  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>
