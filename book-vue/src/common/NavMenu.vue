<template>
  <div>
    <el-menu
      :default-active="currentPath"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      style="width: 1920px ; height: 60px;right: 20px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold" v-for="notice in notices">{{notice.content}}</span>
      <el-input
        placeholder="快速搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px;position:absolute;margin-top: 12px;right: 18%"
        v-model="keywords" >
      </el-input>
      <el-button
        type="primary"
        size="medium"
        style="width: 100px;position:absolute;margin-top: 12px;right: 12%"
        @click="searchBook">
        搜索
      </el-button>
      <el-dropdown style="width:120px;cursor: pointer;position: absolute;right: 2%;">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="" @click="$router.push('/login')" style="width: 30px;height: 30px;border-radius: 50%;position: relative;top:13px;right: 5px"/>
        <span>{{user.name}}</span><i class="el-icon-arrow-down" style="margin-left: 5px" ></i>
        <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
          <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人信息</el-dropdown-item>
          <el-dropdown-item style="font-size: 14px; padding: 5px 0">
            <span style="text-decoration: none" >退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import global from "@/assets/global.js";
import {store} from "xijs";
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/', navItem: '首页'},
          {name: '/mybook', navItem: '我的图书'},
          {name: '/publish', navItem: '发布图书'},
        ],
        keywords: '',
        notic: [],
        notices: [],
        user:{
          name:this.name,
          // imgUrl:this.imgUrl
        },
      }
    },
    computed: {
      hoverBackground () {
        return '#ffd04b'
      },
      currentPath () {
        var x = this.$route.path.indexOf('/', 1)
        if (x !== -1) {
          return this.$route.path.substring(0, x)
        } else {
          return this.$route.path
        }
      }
    },
    mounted: function () {
      this.loadNotices()
      this.isLogin()
    },
    methods:{
      searchBook() {
        debugger
        this.$axios({
          url: '/Books/search',
          method: 'post',
          params: {
            key: this.keywords
          }
        }).then(response => {
          if (response.status === 200) {
            debugger
            this.$emit('searchbar',response.data)
          } else {
            debugger
            this.$message.error(response.data.message)
          }
        })
      },
      loadNotices() {
        let i=0
        this.$axios.get('/notices').then(response => {
          // this.notices = response.data.result
          this.notic = response.data.result
          this.notices = this.notic.slice(i, 1)
          //每隔3秒显示一条公告
          setInterval(() => {
            i++
            if (i === this.notic.length) {
              i = 0
            }
            this.notices = this.notic.slice(i, i+1)
          }, 10000)
        })
      },
    // 判断用户是否登录
      isLogin() {
          debugger
        let token = store.get("accessToken").value
        if (token !== null) {
          this.$axios({
            url: '/v1/user/me',
            method: 'get',
            params: {
              accessToken : token
            }
        }).then(response => {
          if (response.status === 200) {
            this.user.name = response.data.nickname
            // this.user.imgUrl = response.data.imgUrl
          } else {
            this.$message.error(response.data.message)
          }
        })
        }
      },



    }
  }
</script>

<style scoped>

  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

</style>
