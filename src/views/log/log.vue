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
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getList('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <div style="height:10rem;margin-top:1rem">
      <el-timeline v-for="log of list" :key="log._id" :reverse="false">
        <el-timeline-item :timestamp="log.date" placement="top">
          <el-card>
            <div style="display:flex;justify-content:space-between;align-items:center">{{log.description}}<el-tag type="success">bug</el-tag></div>
            <!-- <p>提交于 2018/4/12 20:46</p> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Log extends Vue {
  list: any[] = [];
  sortType: boolean = true;

  async getList() {
    let d = await (this as any).$API.logModel.GetList();
    this.list = d.list.reverse();
  }
  created() {
    this.getList();
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  height: 100%;
  padding: 1rem;
  .sortType {
    margin-bottom: 1rem;
  }
}
</style>