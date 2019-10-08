<template>
  <div style="position:absolute;top:2.2rem;bottom:0;left:0;right:0;padding:0.5rem">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
// import screenfull from "screenfull";
import BreadCrumb from "./BreadCrumb.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class MainBody extends Vue {}
</script>
<style lang='scss' scoped>
</style>