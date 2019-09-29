<template>
  <div class="table-wrapper">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <search-bar :searchData="searchConditions" ref="searchBar"></search-bar>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getList('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
      <el-table-column label="最后登录时间" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 0.2rem">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>

      <el-table-column prop="identity" label="用户身份" align="center">
        <template slot-scope="scope">
            {{scope.row.identity|userIdentityFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="isOnline" label="在线状态" align="center">
        <el-switch v-model="isOnline" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pagesizes"
        :page-size="pagination.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>

    <my-dialog :outerVisible="isShowAddDialog" title="新增用户">
      <add-form ref="addForm">
        <el-form-item>
          <el-button type="primary" @click="addForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </add-form>
    </my-dialog>
  </div>
</template>

<script lang="ts">
import { AddForm } from "./components";
import tableMixin from "@/mixins/table";
import { Component, Vue, Mixins, Watch } from "vue-property-decorator";
@Component({
  components: {
    AddForm
  }
})
export default class User extends Mixins(tableMixin) {
  searchConditions = {
    author: ""
  };

  isOnline:boolean=false;

  async addForm(){
    let d=await (this as any).$refs.addForm._saveData()
    this.isShowAddDialog=false
    if(d.code==0){
      this.getList(this._getList);
    }
  }

  handleSearch(){}

  async _getList() {
    let d = await (this as any).$API.userModel.GetList();
    return d
  }

  @Watch("pagination.currentPage")
  changeCurrentPage() {
    this.getList(this._getList);
  }

  created() {
    this.getList(this._getList);
  }
}
</script>
<style lang='scss' scoped>
.search-item {
  font-size: 0.4rem;
}
</style>