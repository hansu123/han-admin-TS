<template>
  <div class="chart_wrapper">
    <div style="width:100%;display:flex;justify-content:flex-end">
      <el-radio-group v-model="radioType">
        <el-radio-button label="周"></el-radio-button>
        <el-radio-button label="月"></el-radio-button>
        <el-radio-button label="季度"></el-radio-button>
        <el-radio-button label="年"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="main" ref="mylineChart"></div>
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
    }, //设置标题
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }, //设置X轴
    yAxis: {
      type: "value"
    }, //设置y轴
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true
      }
    ] //数据
  };
  radioType: string = "周";
  mounted() {
    (this as any).$echarts
      .init((this as any).$refs.mylineChart, "walden")
      .setOption(this.option, true);
  }
}
</script>
<style lang='scss' scoped>
.chart_wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    width: 100% !important;
    height: 100%;
  }
}
</style>