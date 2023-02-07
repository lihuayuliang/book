<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red">
    <el-menu-item index="0">
      <i class="el-icon-menu"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item v-for="category in categories"
                  :key="category.id" :index="category.id.toString()">
      <i class="el-icon-menu"></i>
      <span slot="title">{{category.name}}</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
import global from "@/assets/global.js";

   export default {
     name: 'SideMenu',
     data () {
       return {
         categories: []
       }
     },
     mounted: function () {
       this.loadCategories()
     },
     methods:{
       loadCategories () {
         this.$axios.get('/categories').then(response => {
           this.categories = response.data
         })
       },
       handleSelect (index) {
         global.setCategotyId(index)
         global.setPageNum(1)
         debugger
         this.$emit('indexSelect',index)
       }
     }
   }
</script>

<style scoped>
  .categories {
    /*position: fixed;*/
    position: absolute;
    margin-left: 50%;
    left: -890px;
    top: 100px;
    height: max-content;
    width: 130px;

  }
</style>
