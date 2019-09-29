<template>
  <div class="table-wrapper">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <search-bar :searchData.sync="searchConditions" ref="searchBar"></search-bar>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getList('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
      <el-table-column label="Date" align="center">
       <template slot-scope="scope">
         {{scope.row.postTime|dateFilter}}
       </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>
      <el-table-column prop="title" label="文章标题" align="center"></el-table-column>
      <el-table-column prop="cate" label="文章分类" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleEdit(scope.row)" v-auth="'manager'">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            v-auth="'manager'"
          >删除</el-button>
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
        :total="articleTotal"
      ></el-pagination>
    </div>

    <edit-dialog :outerVisible.sync="isShowEditDialog" :ruleForm="articleEditData"></edit-dialog>
  </div>
</template>

<script lang="ts">
import EditDialog from "../dialog/EditDialog.vue";
import tableMixin from "@/mixins/table";
import { State, Action, namespace } from "vuex-class";
const articleModule = namespace("article");
interface SearchValue {
  page?:string,
  author?:string,
  cate?:string|number,
  startTime?:string,
  endTime?:string,
}
import { Component, Vue, Watch, Mixins } from "vue-property-decorator";
@Component({
  components: {
    EditDialog
  }
})
export default class Article extends Mixins(tableMixin) {
  @articleModule.State("articleList") articleList;
  @articleModule.State("articleTotal") articleTotal;
  @articleModule.Action("delArticleAction") delArticleAction;
  @articleModule.Action("getListAction") getListAction;
  isShowEditDialog: boolean = false;
  articleEditData: object = {};
  // tableData: any[] = [];
  searchConditions: SearchValue = {
    page:"article",
    author: "",
    cate: "",
    startTime: "",
    endTime:""
  };

  options: any[] = [{ value: 1, label: "hansu" }, { value: 2, label: "lilei" }];

  async _getList() {
    let { pagesize, currentPage } = this.pagination;
    let {page,...data}=this.searchConditions
    let query=(this as any).$lodash.getSearchQueryData(data)
    let params = Object.assign(
      { pagesize, currentPage },
      query
    );
    return await this.getListAction(params);
  }
 

  async handleDelete(data) {
    let res = await (this as any).$confirm(
      "此操作将永久删除文章, 是否继续?",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    );
    try {
      if (res) {
        await this.delArticleAction(data._id);
      }
    } catch (err) {
      (this as any).$message({
        type: "info",
        message: "已取消删除"
      });
    }
  }
  
  handleAdd(){
    (this as any).$router.push("/article/addArticle")
  }

  handleSearch() {
    this.getList(this._getList);
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
<style lang='scss' scoped></style>