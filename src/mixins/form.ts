import {Component,Vue} from "vue-property-decorator"
@Component({})
export default class FormMixin extends Vue{

  async saveData(func,data,cb=()=>{}):Promise<any>{
    let d = await func(data);
        if (d.code === 0) {
          this.$message({
            message: "修改成功",
            type: "success",
            onClose: () => {
              cb()
            }
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "error",
            onClose: () => {
              cb()
            }
          });
      }
    return d
  }

}