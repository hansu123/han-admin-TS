<template>
  <div class="table-wrapper">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <search-bar :searchData="searchConditions" ref="searchBar"></search-bar>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getList('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>
    <el-table :data="list" style="width: 100%" :default-sort="{prop: 'ID', order: 'descending'}">
      <el-table-column label="ID" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._id.slice(-4) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.level?'success':''">{{ scope.row.level|planLevelFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span class="wes-1">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span class="wes-1">{{ scope.row.describe }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="创建者" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方案" width="180" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="200"
            trigger="hover"
            :content="scope.row.done?'已解决':'未解决'"
          >
            <el-switch
              slot="reference"
              v-model="scope.row.done"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            ></el-switch>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="截止日期" sortable width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deadline|dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="scope.row.done"
          >编辑</el-button>
          <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">取消</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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

    <!-- 弹出框 -->
    <my-dialog title="新增迭代需求" :outerVisible.sync="isShowAddDialog">
    <add-form ref="addForm">
      <el-form-item>
          <el-button type="primary" @click="addForm">确认</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </add-form>
    </my-dialog>

    <my-dialog title="修改迭代功能" :outerVisible.sync="isShowEditDialog">
    <edit-form :ruleForm="rowData"></edit-form>
    </my-dialog>

  </div>
</template>

<script lang="ts">
interface SearchValue {
  page: string;
  level: number | string;
  deadline: string
}
import tableMixin from "@/mixins/table";
import { AddForm, EditForm } from "./components";
import { Component, Vue, Mixins } from "vue-property-decorator";

@Component({
  components: {
    EditForm,
    AddForm
  }
})
export default class Plan extends Mixins(tableMixin) {
  searchConditions: SearchValue = {
    page: "feature",
    level: "",
    deadline: ""
  };


  handleDelete(index, row) {
    console.log(index, row);
  }

  search() {}

  async _getList() {
    return await (this as any).$API.featureModel.GetList();
  }

 
  async addForm() {
    let d=await (this as any).$refs.addForm._saveData()
    this.isShowAddDialog=false
    if(d.code==0){
      this.getList(this._getList);
    }
  }

  //分页
  handleSizeChange(val) {
    this.pagination.pagesize = val;
  }

  handleCurrentChange(val) {
    this.pagination.currentPage = val;
    let {currentPage,pagesize}=this.pagination
    let query={
       currentPage,
       pagesize
    }
    this.getList(this._getList);
  }

  created() {
    this.getList(this._getList);
  }

}
</script>