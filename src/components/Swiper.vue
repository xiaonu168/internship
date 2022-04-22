<template>
  <div
    class="box"
    :style="{ '--imgheight': imgheight + 'px', '--imgwidth': imgwidth + 'px' }"
  >
    <!-- //轮播图片 -->
    <img
      @mouseover="changeInterval(true)"
      @mouseleave="changeInterval(false)"
      v-for="(item, index) in imgArr"
      :key="index"
      :src="require('../assets/carousel/' + item.url + '.png')"
      alt="暂无图片"
      v-show="item.id === currentIndex"
      @click="changePage(index)"
    />
    <!-- //左侧按钮 -->
    <div @click="clickIcon('left')" class="iconDiv icon-left">
      <i class="el-icon-caret-left"></i>
    </div>
    <!-- //右侧按钮 -->
    <div @click="clickIcon('right')" class="iconDiv icon-right">
      <i class="el-icon-caret-right"></i>
    </div>
    <!-- //控制圆点 -->
    <div class="banner-circle">
      <ul>
        <li
          @click="changeImg(item.id)"
          v-for="item in imgArr"
          :key="item.id"
          :class="item.id === currentIndex ? 'active' : ''"
        ></li>
      </ul>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "MySwiper",
  data() {
    return {
      currentIndex: 0, //当前所在图片下标
      timer: null, //定时轮询
    };
  },
  props: {
    //图片和跳转路径
    imgArr: {
      require: true,
      type: Array,
    },
    //尺寸
    imgwidth: { type: Number, require: true },
    imgheight: { type: Number, require: true },
  },

  mounted() {
    this.startInterval();
  },
  methods: {
    changePage(i) {
      this.$router.push(this.imgData[i].path);
    },

    //开启定时器
    startInterval() {
      // 事件里定时器应该先清除再设置，防止多次点击直接生成多个定时器
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.imgArr.length - 1) {
          this.currentIndex = 0;
        }
      }, 2000);
    },
    // 点击箭头
    clickIcon(val) {
      if (val === "right") {
        this.currentIndex++;
        if (this.currentIndex === this.imgArr.length) {
          this.currentIndex = 0;
        }
      } else {
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = this.imgArr.length - 1;
        }
      }
    },
    // 点击控制圆点
    changeImg(index) {
      this.currentIndex = index;
    },
    //鼠标移入移出控制
    changeInterval(val) {
      if (val) {
        clearInterval(this.timer);
      } else {
        this.startInterval();
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.box {
  /* width: 600px; */
  /* height: 400px; */
  min-width: 600px;
  min-height: 400px;
  width: var(--imgwidth);
  height: var(--imgheight);
  position: relative;
  margin: 30px auto;
  overflow: hidden;
}
/* 清除li前面的圆点 */
li {
  list-style-type: none;
}
/* 轮播图片 */
.box img {
  width: 100%;
  height: 100%;
}

/* 箭头图标 */
.iconDiv {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: 2px solid #666;
  border-radius: 16px;
  background-color: rgba(222, 222, 222, 0.7);
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
}
.iconDiv:hover {
  background-color: whitesmoke;
}
.icon-left {
  left: 10px;
}
.icon-right {
  right: 10px;
}

/* 控制圆点 */
.banner-circle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
}
.banner-circle ul {
  margin: 0 50px;
  height: 100%;
  text-align: center;
}
.banner-circle ul li {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px;
  border-radius: 7px;
  background-color: rgba(222, 222, 222, 0.7);
  cursor: pointer;
}
.active {
  background-color: rgb(63, 63, 63) !important;
}
</style>