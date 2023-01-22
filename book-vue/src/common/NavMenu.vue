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
        v-model="keywords">
      </el-input>
<!--      显示用户信息，以圆形格式显示头像图片-->
      <el-dropdown style="position: absolute;right: 10%;margin-top: 10px">
        <span class="el-dropdown-link">
<!--          <img :src="global.user.imgUrl" style="width: 40px;height: 40px;border-radius: 50%">-->
<!--          <span style="margin-left: 10px">{{global.user.name}}</span>-->
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/', navItem: '首页'},
          {name: '/login', navItem: '管理中心'}
        ],
        keywords: '',
        notic: [],
        notices: []
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
    },
    methods:{
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
      }
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
