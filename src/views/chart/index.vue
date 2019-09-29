<template>
  <div class="chart_wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Chart extends Vue {
 
}
</script>
<style lang='scss' scoped>
.chart_wrapper{
  height: 100%;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}
</style>