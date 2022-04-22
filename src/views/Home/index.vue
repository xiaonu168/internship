<template>
  <div>
    <Header></Header>
    <ul>
      <li>
        <router-link class="link" to="/home/page1">查看合同</router-link>
      </li>
      <li>
        <router-link class="link" to="/home/page2">查看图表</router-link>
      </li>
      <li>
        <router-link class="link" to="/test">查看组件和 js封装</router-link>
      </li>
    </ul>
    <br />
    <div>
      <router-view class="page" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "HomePage",
  components: { Header },
  mounted() {
    console.log("这是home");
  },
};
</script>

<style scoped>
ul {
  display: inline-block;
  width: 100%;
  list-style: none;
  margin-bottom: 20px;
  min-width: 500px;
  padding-left: 10px;
  margin-top: 45px;
}
li {
  float: left;
  margin-right: 30px;
}
.link {
  background-color: rgb(20, 172, 231);
  font-size: 18px;
  padding: 10px;
  color: aliceblue;
  border-radius: 5px;
  height: 50px;
}

.page {
  width: 100%;
  min-width: 800px;
  min-height: 800px;
  margin: 0 auto;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>