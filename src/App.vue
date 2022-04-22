<template>
  <div id="app">
    <!-- <el-header 
      ><router-link class="link1" v-if="!logged" to="/login">登录</router-link>
      <br />
      <router-link class="link1" v-if="logged" to="/login">欢迎你{{ logged }}</router-link>
      <br />
      <router-link class="link2" to="/home">主页</router-link> <br />
    </el-header> -->

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0 auto;
  /*  
  text-align: center;
  color: #2c3e50; */
  /* position: relative; */
  /* min-width: 950px; */
  /* width: 100%; */
}
</style>
