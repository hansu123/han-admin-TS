<template>
  <div class="chart_wrapper">
    <div class="main" ref="myChart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Chart extends Vue {
  option = {
    title: {
      text: "博客近七天访问量",
      x: "center",
      textStyle: {
        color: "#000"
      }
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true
      }
    ]
  };
  mounted() {
    this.$echarts.init((this as any).$refs.myChart, "walden").setOption(this.option, true);
  }
}
</script>
<style lang='scss' scoped>
.chart_wrapper {
  height: 100%;
  .main {
    width: 100% !important;
    height: 100%;
    padding: 0.2rem 0;
  }
}
</style>