import { Component, Vue } from "vue-property-decorator"
//分页接口
interface PaginationValue {
  total?: number;
  pagesize: number;
  pagesizes: number[];
  currentPage: number;
}
@Component({})
export default class TableMixin extends Vue {
  loading: boolean = false
  list: any[] = []


  //分页
  pagination: PaginationValue = {
    pagesize: 10,
    pagesizes: [10, 20, 30, 40],
    currentPage: 1,
    total:0
  };

  //编辑的弹出框显示
  isShowEditDialog: boolean = false;

  //新增的弹出框显示
  isShowAddDialog: boolean = false;

  //某行数据
  rowData: any = {};

  //修改的方法
  handleEdit(index, row) {
    this.rowData = row;
    this.isShowEditDialog = true;
  }

  //新增的方法
  handleAdd() {
    this.isShowAddDialog = true;
  }


  //新增的弹出框显示


  //分页
  handleSizeChange(val) {
    this.pagination.pagesize = val;
  }

  handleCurrentChange(val) {
    this.pagination.currentPage = val;
  }


  //因为各自的API不同，所以需要传入每个页面自定义的func来获取数据，r表示更新最新数据
  async getList(func, r?: string) {
    this.loading = true
    let d = await func()
    if (d.list.length > 0) {
      this.loading = false
      this.list = d.list;
      this.$set(this.pagination,"total",d.total)
    }
    else {
      this.$message({
        type: "error",
        message: "暂无数据"
      });
      this.loading = false
      this.list = []
      if(d.hasOwnProperty('total')){
        this.$set(this.pagination,"total",d.total)
      }
    }

    if (r === "refresh") {
      this.$message({
        type: "success",
        message: "已是最新数据"
      });
    }

    return d
  }

}