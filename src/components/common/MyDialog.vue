<template>
  <div>
    <el-dialog :title="title" :visible.sync="innerVisible" center>
      <slot></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import dialogMixin from "@/mixins/dialog";
import { Component, Vue, Prop, Watch, Mixins } from "vue-property-decorator";
@Component({})
export default class EditDialog extends Mixins(dialogMixin) {
  created() {
    (this as any).$bus.$on("cancel",()=>{
      console.log("save")
      this.handleCancel()
    })
  }
}
</script>