<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="确认身份" prop="identity">
        <el-select v-model="ruleForm.identity" placeholder="请选择">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="VIP用户" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <slot></slot>
    </el-form>
  </div>
</template>

<script lang="ts">
interface RuleFormValue {
  name: string;
  email: string;
  identity: string;
  sex: string;
  createAt: number;
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
    name: "",
    email: "",
    identity: "",
    sex: "",
    createAt: Date.now()
  };
  rules: any = {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" }
    ],
    email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
    identity: [{ required: true, message: "请选择身份", trigger: "change" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }]
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
      return this.saveData(
        (this as any).$API.userModel.AddUser,
        query
      );
    }
  }
}
</script>
<style lang='stylus' scoped></style>