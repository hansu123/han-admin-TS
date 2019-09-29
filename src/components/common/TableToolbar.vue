<template>
  <div class="tableToolBar">
      <slot name="plain"></slot>
  </div>
</template>

<script>
import {Component,Vue} from "vue-property-decorator"
@Component({
  components:{}
})
export default class TableToolBar extends Vue{

}
</script>
<style  lang="scss" scoped>
.tableToolBar {
  padding:0.2rem;
  background:#eee;
}
</style>