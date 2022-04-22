<template>
  <div>
    <Header></Header>
    <button class="link" @click="goHome('/home')">查看主页</button>
    <br />
    <!-- 测试自定义组件 -->
    <p>
      NavTab:<br />
      <span class="introduction">
        传参:对象数组[{地址path，标题title，children}]、宽高尺寸值</span
      ><br />
      <span class="introduction">
        操作:鼠标悬浮展开子级菜单，点击跳转，标题过长鼠标悬浮参见悬浮提示</span
      >
    </p>
    <Nav :treearr="navData" :navwidth="300" :navheight="300"> </Nav>
    <br />
    <br />
    <p>
      Swiper:
      <span class="introduction">
        传参对象数组[{图片名称,图片点击跳转地址}]</span
      >
    </p>
    <Swiper :imgArr="imgArr" :imgwidth="600" :imgheight="400"></Swiper>
    <br />
    <br />
    <!-- 测试js方法封装 -->
    <div class="js-func1">
      <button class="fun1-item" @click="func1">开始10秒倒计时！</button>
      <span class="fun1-item">{{ triggerTimeout }}</span>
    </div>
    <div class="js-func2">
      <el-select class="opt" v-model="special" placeholder="选择特殊号码类型">
        <el-option label="身份证" value="id"> </el-option>
        <el-option label="电话号码" value="phone"> </el-option>
        <el-option label="银行卡" value="money"> </el-option>
      </el-select>
      <el-input type="number" v-model="num" placeholder="请输入内容"></el-input>
      <button @click="changeNum([special, num])">应用js方法转变：</button>
      <p>{{ numChanged }}</p>
    </div>
    <div class="js-func3">
      <img src="~@/assets/jsfunc3.png" alt="" />
      <el-input
        type="text"
        v-model="target"
        placeholder="想要查看谁的父级id？"
      ></el-input>
      <button @click="func3">应用js方法找到所有上层节点id：</button>
      <!-- <el-input class="idresult" type="text" v-model="test3result"></el-input> -->
      <p ref="idresult" class="idresult"></p>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/Swiper.vue";
import Nav from "@/components/Navigation.vue";
import axios from "axios";
import Header from "@/components/Header.vue";
export default {
  name: "TestComponent",
  components: { Swiper, Nav, Header },
  data() {
    return {
      imgArr: [],
      navData: [],
      special: "",
      num: "",
      numChanged: "",
      move: false,
      triggerTimeout: "",
      timer: null,
      target: "",
      test3result: [],
      test3: [
        { id: "r2x" },
        {
          id: "l1o",
          children: [
            { id: "12" },
            {
              id: "23",
              children: [
                { id: "daf", children: [{ id: "5h5" }] },
                { id: "wg4" },
              ],
            },
          ],
        },
        {
          id: "n3b",
          children: [
            { id: "a5b" },
            {
              id: "jlu",
              children: [
                { id: "lty", children: [{ id: "asi" }, { id: "h6k" }] },
                { id: "y8i" },
              ],
            },
            { id: "i8d" },
          ],
        },
      ],
    };
  },
  mounted() {
    console.log("这是test");
    axios.get("/jsonfiles/carsousel.json").then((res) => {
      res.data.imgs.forEach((e, index) => {
        let temp = {};
        temp.id = index;
        temp.url = e.url;
        temp.path = e.path;
        this.imgArr.push(temp);
      });
    });
    axios.get("/jsonfiles/navtree.json").then((res) => {
      this.navData = res.data.navtree;
    });
  },
  watch: {
    triggerTimeout(newVal) {
      if (newVal == -1) {
        clearInterval(this.timer);
        this.triggerTimeout = "";
      }
    },
  },
  methods: {
    // 2题
    goHome(x) {
      this.$router.push(x);
    },
    changeNum(s) {
      this.numChanged = this.func2(s[0], s[1]);
    },
    // 3（1）题
    func1() {
      console.log("triggerTimeout倒计时开始！");
      this.triggerTimeout = 10;
      this.timer = setInterval(() => {
        this.triggerTimeout = this.triggerTimeout - 1;
      }, 1000);
    },

    //3（2）题
    func2(type, number) {
      var l = number.length;
      console.log(l);
      let result = "";
      switch (type) {
        case "id":
          if (l != 18) {
            alert("输入不符合身份证长度");
          } else {
            result = number.slice(0, 6) + "********" + number.slice(14, 18);
          }
          break;
        case "phone":
          if (l != 11) {
            alert("输入不符合电话号长度");
          } else {
            result = number.slice(0, 3) + "****" + number.slice(7, 11);
          }
          break;
        case "money":
          if (l != 19) {
            alert("输入不符合银行卡号长度");
          } else {
            result = number.slice(0, 4) + "************" + number.slice(16, 19);
          }
          break;
        default:
          break;
      }
      return result;
    },

    // 3（3）题
    func3() {
      this.test3result = [];
      this.getFatherid(this.target, this.test3, "start");
      console.log(this.test3result);
      this.$refs.idresult.innerText = this.test3result;
    },
    getFatherid(target, arr, tag) {
      //仍然返回undefined，只能用data变量存储结果
      //三个参数target是目标id，arr是循环的每个节点的child对象数组，tag标记本节点及之前各代的下标
      let result = [];
      for (let item of arr) {
        if (item.id === target) {
          let r = tag;
          let r1 = r.split("+");
          if (r1.length == 1) {
            this.test3result.push("没有父节点");
          } else {
            r1.forEach((element) => {
              this.test3result.push(element);
            });
            this.test3result.shift();
            console.log("this.test3result:!!!!!!!", this.test3result);
          }
          result = this.test3result;
          break;
        } else {
          if (item.children != undefined) {
            var temptag = tag + "+" + item.id;
            this.getFatherid(target, item.children, temptag);
          }
        }
      }
      return result;
    },
  },
};
</script>


<style scoped>
/* 动画用于查看js题目1 */
@keyframes movelogo {
  0% {
    transform: rotateX(20deg) rotateY(20deg);
  }
  50% {
    transform: rotateX(200deg) rotateY(380deg) translate(0px, 0px);
  }
  100% {
    transform: rotateX(380deg) rotateY(740deg) translate(0px, 0px);
  }
}

p {
  padding: 0;
  font-size: 20px;
  font-weight: 700;
  color: rgb(20, 172, 231);
  margin: 0 auto;
  text-align: center;
}
.link {
  background-color: rgb(20, 172, 231);
  font-size: 18px;
  padding: 10px;
  color: aliceblue;
  border-radius: 5px;
  border-color: transparent;
  width: 100px;
  position: relative;
  left: 10px;
  margin-top: 45px;
  margin-bottom: 30px;
  cursor: pointer;
  height: 40px;
  line-height: 18px;
}
.introduction {
  font-size: 15px;
}

/* 以下是测试js封装 */
/* func1 */
.js-func1,
.js-func2,
.js-func3 {
  width: 1200px;
  height: 120px;
  border: 2px solid rgb(20, 172, 231);
  border-radius: 8px;
  margin: 15px auto;
  position: relative;
}
.fun1-item {
  position: absolute;
}
.fun1-item:first-child {
  left: 10%;
  top: 30%;
  font-size: 16px;
  color: aliceblue;
  width: 250px;
  height: 40px;
}
.fun1-item:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  width: 60px;
  height: 60px;
  color: deepskyblue;
  font-weight: 700;
  font-size: 34px;
  border: 2px solid deepskyblue;
  border-radius: 28px;
  line-height: 60px;
  text-align: center;
}
/* func2 */
.js-func2 .el-select {
  position: absolute;
  width: 170px;
  left: 5%;
  top: 40px;
}
.js-func2 .el-input {
  position: absolute;
  width: 250px;
  left: 25%;
  top: 40px;
}
button {
  cursor: pointer;
  background-color: rgb(20, 172, 231);
  border-radius: 5px;
  border-color: rgb(20, 172, 231);
  color: aliceblue;
}
.js-func2 button {
  width: 170px;
  height: 40px;
  position: absolute;
  left: 55%;
  top: 40px;
  font-size: 16px;
  text-align: center;
}
.js-func2 p {
  border: 2px solid gray;
  width: 250px;
  height: 40px;
  position: absolute;
  left: 75%;
  top: 40px;
}
/* func3 */
.js-func3 {
  height: 500px;
}
.js-func3 img {
  height: 100%;
  position: absolute;
  left: 10%;
}
.js-func3 .el-input {
  position: absolute;
  top: 100px;
  left: 50%;
  width: 250px;
}
.js-func3 .idresult {
  position: absolute;
  left: 50%;
  top: 300px;
  width: 250px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  background-color: rgb(222, 222, 222);
}
.js-func3 button {
  left: 70%;
  width: 250px;
  height: 40px;
  position: absolute;
  top: 200px;
  left: 50%;
}
</style>