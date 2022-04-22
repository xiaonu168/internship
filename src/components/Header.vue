<template>
  <div style="height: 45px">
    <!-- <el-header style="border-bottom: 2px solid rgb(5, 45, 61); height: 45px">
      <span class="username">欢迎你，{{ user }}！</span>
      <span class="logout" @click="logout">退出</span>
    </el-header> -->

    <span class="username">| &nbsp;欢迎你，{{ user }}！</span>
    <span class="logout" @click="logout">退出</span>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "MyHeader",
  data() {
    return {
      user: "",
    };
  },
  props: {
    username: { require: false, type: String },
  },
  computed: {},
  mounted() {
    console.log("这是header组件");
    var x = sessionStorage.getItem("minitoken");
    if (x) {
      this.user = x.split("=")[0];
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("minitoken");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
span {
  color: rgb(5, 45, 61);
  font-size: 20px;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  position: absolute;
}
.username {
  width: 200px;
  left: 0%;
  transform: translateX(40px);
}
.logout {
  width: 60px;
  left: 0%;
  transform: translateX(5px);
  cursor: pointer;
}
</style>