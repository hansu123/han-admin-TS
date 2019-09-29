<template>
  <div class="bread_wrap">
    <span v-for="(elem) of breadList" :key="elem" class="bread_item">
      {{convertTitle(elem)}}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class BreadCrumb extends Vue {
  breadList: any[] = [];
  convertTitle(value) {
    return (this as any).$t("siderBar." + value);
  }

  @Watch("$route")
  routeChange() {
    this.breadList = this.$route.matched.map(route => route.name);
    if(this.breadList[1]==="home"){
      console.log(this.breadList)
      this.breadList.splice(1,1)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/styles/mixin.scss";
.bread_wrap {
  width: 100%;
  height: 1.2rem;
  font-size:0.3rem;
  @include df-row($ai:center);
  color:#fff;
  .bread_item{
    margin-left:0.1rem;
    &:not(:last-child)::after{
    content:"/";
    height:100%;
    }
    &:last-child{
     color:rgb(230, 161, 105);
    }
  }
}
</style>