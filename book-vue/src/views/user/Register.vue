<template>
  <div class="wrapper">
    <div class="register">
      <div class="title"><b>注册</b></div>
      <el-form :model="user" :rules="rules" ref="userForm" label-width="0px">
        <el-form-item prop="username">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.confirm" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.address" placeholder="地址"></el-input>
        </el-form-item>
        <div style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="register">注册</el-button>
          <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/login')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {},
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        confirm:[
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        nickname:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        address:[
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register(){
      let user = new FormData;
      for(let key in this.user){
        user.append(key, this.user[key])
      }
      debugger
      if(user.password !== user.confirm){
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        })
      }
      this.$axios({
        url: '/v1/user/register',
        method: 'post',
        data: user
      }).then(resp => {
        if(resp.data === "注册成功"){
          this.$router.push('/login')
        }else if(resp.data === "用户名已存在"){
          this.$message({
            message: '用户名已存在',
            type: 'error'
          })
        }
        else{
          this.$message({
            message: '注册失败，请重试',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

  .wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #fa6684, #627bfc);
    overflow: hidden;
  }
  .register{
    margin: 200px auto;
    background-color: #fff;
    width: 350px;
    height: 600px;
    padding: 20px;
    border-radius: 10px
  }
  .title{
    margin: 20px 0;
    text-align: center;
    font-size: 24px
  }
</style>