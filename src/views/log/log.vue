<template>
  <div class="table-wrapper">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <div>
          <el-radio-group v-model="sortType">
            <el-radio :label="true" border>倒序</el-radio>
            <el-radio :label="false" border>正序</el-radio>
          </el-radio-group>
        </div>
        <el-button-group>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getList('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <div class="timeline_content">
      <el-timeline v-for="log of list" :key="log._id" :reverse="false">
        <el-timeline-item :timestamp="log.createAt|dateFilter" placement="top">
          <el-card>
            <div class="card_content">{{log.description}}<el-tag :type="log.cate|planTagTypeFilter">{{log.cate}}</el-tag></div>
            <!-- <p>提交于 2018/4/12 20:46</p> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>


    <my-dialog :outerVisible.sync="isShowAddDialog" title="新增日志">
      <add-form ref="addForm">
         <el-form-item>
          <el-button type="primary" @click="addForm">确认</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </add-form>
    </my-dialog>
  </div>
</template>

<script lang="ts">
import tableMixin from "@/mixins/table"
import AddForm from "./components/form/AddForm.vue"
import { Component, Vue, Watch,Mixins } from "vue-property-decorator";
@Component({
  components:{
    AddForm
  }
})
export default class Log extends Mixins(tableMixin) {
  sortType: boolean = true;

  async addForm(){
    let d=await (this as any).$refs.addForm._saveData()
    this.isShowAddDialog = false;
    if (d.code == 0) {
      this.getList(this._getList);
    }
  }

  async _getList() {
    let d = await (this as any).$API.logModel.GetList();
    return d
  }

  @Watch("sortType")
  changeSortType(newVal){
    this.list=this.list.reverse()
  }
  created() {
    this.getList(this._getList);
  }
}
</script>
<style lang='scss' scoped>
.timeline_content{
  height:10rem;
  margin-top:1rem;
  .card_content{
    display:flex;
    justify-content:space-between;
    align-items:center
  }
}
</style>