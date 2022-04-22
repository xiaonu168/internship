<template>
  <div>
    <div ref="pie" class="echart"></div>
    <div ref="bar" class="echart"></div>
    <div ref="line" class="echart"></div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "PageTwo",
  data() {
    return {
      a: "",
      pieData: [],
      barData: {},
    };
  },
  mounted() {
    // axios.get("/jsonfiles/echartdata.json").then((res) => {
    // this.pieData = res.data.pie;
    // });
    this.drawLine();
    this.drawBar();
    this.drawPie();
  },
  methods: {
    drawBar() {
      console.log("drawBar");
      let myChart = this.$echarts.init(this.$refs.bar);
      var option = {
        title: {
          text: "每日摄取热量(千卡)",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Amy", "Tom", "Tina", "Sheldon", "Lenerd"],
          left: "30%",
        },
        grid: {
          left: "10%",
          right: "3%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series: [
          {
            name: "Amy",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [2030, 2226, 1933, 2034, 2129, 2231, 2432, 2340],
          },
          {
            name: "Tom",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [2331, 1928, 2332, 2527, 2329, 2431, 2231, 2132],
          },
          {
            name: "Tina",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [2230, 2428, 2133, 2331, 1932, 2038, 2131, 2129],
          },
          {
            name: "Sheldon",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [1934, 2039, 2031, 1930, 2026, 2033, 1930, 2140],
          },
          {
            name: "Lenerd",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [1933, 2329, 2432, 2234, 2127, 2126, 2330, 2237],
          },
        ],
        color: ["#006400", "#3CB46E", "#7FFFAA", "#C8FAC8", "#FFFF00"],
      };
      myChart.setOption(option);
    },
    drawLine() {
      console.log("drowLine");
      let myChart = this.$echarts.init(this.$refs.line);
      var option = {
        title: {
          text: "每日摄取热量(千卡)",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Amy", "Tom", "Tina", "Sheldon", "Lenerd"],
          left: "30%",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Amy",
            type: "line",
            stack: "Total",
            data: [2030, 2226, 1933, 2034, 2129, 2231, 2432, 2340],
          },
          {
            name: "Tom",
            type: "line",
            stack: "Total",
            data: [2331, 1928, 2332, 2527, 2329, 2431, 2231, 2132],
          },
          {
            name: "Tina",
            type: "line",
            stack: "Total",
            data: [2230, 2428, 2133, 2331, 1932, 2038, 2131, 2129],
          },
          {
            name: "Sheldon",
            type: "line",
            stack: "Total",
            data: [1934, 2039, 2031, 1930, 2026, 2033, 1930, 2140],
          },
          {
            name: "Lenerd",
            type: "line",
            stack: "Total",
            data: [1933, 2329, 2432, 2234, 2127, 2126, 2330, 2237],
          },
        ],
      };
      myChart.setOption(option);
    },
    drawPie() {
      console.log("drowPie");
      let myChart = this.$echarts.init(this.$refs.pie);
      var option = {
        title: {
          text: "每人每周摄取热量(千卡)",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [
              { value: 15015, name: "Amy" },
              { value: 16109, name: "Tom" },
              { value: 15223, name: "Tina" },
              { value: 13923, name: "Sheldon" },
              { value: 15511, name: "Lenerd" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>


<style scoped>
.echart {
  width: 600px;
  height: 600px;
  border: 2px solid deepskyblue;
  border-radius: 6px;
  margin: 10px auto;
  border-radius: 5px;
}
</style>
