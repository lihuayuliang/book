<template>
  <div class="wrapper">
    <div class="login" >
      <div class="title" ><b>登 录</b></div>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="username">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  size="medium" style="margin: 10px 0" @keyup.enter.native="login" prefix-icon="el-icon-lock" show-password v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>
        <div style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="login" >登录</el-button>
          <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/register')">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import global from "@/assets/global";
import { store } from 'xijs';

Vue.prototype.$global = global;
export default {
  name: "Login",
  data() {
    return {
      user: {},
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login(){
      let user = new FormData;
      for(let key in this.user){
        user.append(key, this.user[key])
      }
      user.append("client_id","gateway-client");
      user.append("client_secret","123456");
      user.append("grant_type","password");
      this.$axios({
        url: '/auth/oauth/token',
        method: 'post',
        data: user
      }).then(function(response){
        debugger
        console.log(response.data.access_token);
        //将从授权服务器获得的JWT保存到客户端(浏览器)
        //一般可以保存到cookie或localStorage
          console.log(Date.now() + 20 * 1000)
        store.set("accessToken",response.data.access_token,Date.now() + 24 * 60 * 60 * 1000);
        window.localStorage.setItem("accessToken",response.data.access_token);
          location.href="/"
      }).catch(function(error){
        debugger
        console.log(error);
      })
    }
  }
}
</script>

<style>
  .wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
    overflow: hidden;
  }
  .title{
    margin: 20px 0;
    text-align: center;
    font-size: 24px
  }
  .login{
    margin: 200px auto;
    background-color: #fff;
    width: 350px;
    height: 300px;
    padding: 20px;
    border-radius: 10px
  }
</style>
