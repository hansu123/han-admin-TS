<template>
  <div class="article">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator"
@Component({
  components:{

  }
})
export default class Index extends Vue{

}
</script>
<style  lang="scss" scoped>
</style>