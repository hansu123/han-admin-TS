<template>
  <div>
    <el-dialog title="更新文章" :visible.sync="innerVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input type="text" placeholder="请输入文章标题" v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="文章分类" prop="cate">
          <el-select v-model="ruleForm.cate" placeholder="请选择">
            <el-option label="css" value="css"></el-option>
            <el-option label="javascript" value="javascript"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章简介" prop="summary">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="文章简介,最多输入100个字"
            v-model="ruleForm.summary"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import dialogMixin from "@/mixins/dialog"
import { Component, Vue, Prop, Watch,Mixins } from "vue-property-decorator";
@Component({})
export default class EditDialog extends Mixins(dialogMixin) {

  @Prop(Object)
  ruleForm!: any;
  
  rules = {
    title: [
      { required: true, message: "请输入文章标题", trigger: "blur" },
      { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
    ],
    cate: [{ required: true, message: "请选择分类", trigger: "change" }],
    summary: [{ required: true, message: "请填写文章简介", trigger: "blur" }]
  };

  handleCancel() {
    this.$emit("update:outerVisible", false);
  }

  submitForm(formName) {
    (this as any).$refs[formName].validate(async (valid: boolean) => {
      if (valid) {
        let { _id, title, cate, summary } = this.ruleForm;
        let data = { _id, title, cate, summary };
        let d = await (this as any).$API.articleModel.EditArticle(data);
        if (d.code === 0) {
          this.$message({
            message: "修改成功",
            type: "success",
            onClose: () => {
              this.handleCancel();
            }
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "error",
            onClose: () => {
              this.handleCancel();
            }
          });
        }
      }
    });
  }
}
</script>
<style lang='scss' scoped>
</style>