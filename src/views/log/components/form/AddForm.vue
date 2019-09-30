<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="分类" prop="cate">
        <el-select v-model="ruleForm.cate" placeholder="请选择">
          <el-option label="版本" value="0"></el-option>
          <el-option label="bug修复" value="1"></el-option>
          <el-option label="新功能" value="2"></el-option>
          <el-option label="优化" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" :rows="2" v-model="ruleForm.description" maxlength="100" />
      </el-form-item>

      <el-form-item label="日期" prop="createAt">
        <el-date-picker
          v-model="ruleForm.createAt"
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <slot></slot>
    </el-form>
  </div>
</template>

<script lang="ts">
interface RuleFormValue {
  title: string;
  cate: string;
  description: string;
  createAt: number | string;
}
import formMixin from "@/mixins/form";
import {
  Component,
  Prop,
  Watch,
  Emit,
  Vue,
  Mixins
} from "vue-property-decorator";
@Component({})
export default class AddDialog extends Mixins(formMixin) {
  ruleForm: RuleFormValue = {
    title: "",
    cate: "",
    description: "",
    createAt: ""
  };
  rules: any = {
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    cate: [{ required: true, message: "请输入类别", trigger: "blur" }],
    description: [{ required: true, message: "请输入描述", trigger: "change" }]
  };

  resetForm(formName) {
    (this as any).$refs[formName].resetFields();
  }

  async _saveData() {
    let res = await (this as any).$refs.ruleForm.validate();
    let query = {
      ...this.ruleForm
    };
    if (res) {
      console.log((this as any).$API.logModel.AddLog);
      return this.saveData((this as any).$API.logModel.AddLog, query);
    }
  }
}
</script>
<style lang='stylus' scoped></style>