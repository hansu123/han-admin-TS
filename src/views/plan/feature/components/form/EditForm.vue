<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="ruleForm.title" disabled />
      </el-form-item>
      <el-form-item label="分类" prop="cate">
        <el-tag :type="ruleForm.cate|statusTagTypeFilter">{{ ruleForm.cate }}</el-tag>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" :rows="2" v-model="ruleForm.description" maxlength="100" disabled />
      </el-form-item>

      <el-form-item label="创建者" prop="name">
        <el-input type="text" v-model="ruleForm.name" inline disabled />
      </el-form-item>

      <el-form-item label="方案" prop="done">
        <el-radio v-model="ruleForm.done" :label="false">未解决</el-radio>
        <el-radio v-model="ruleForm.done" :label="true">已解决</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleConfirm" :disabled="!ruleForm.done">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import formMixin from "@/mixins/form";
import { Component, Vue, Prop, Watch, Mixins } from "vue-property-decorator";
@Component({})
export default class EditForm extends Mixins(formMixin) {
  @Prop(Object)
  ruleForm!: any;

  rules = {
    done: [{ required: true, message: "请选择是否解决", trigger: "change" }]
  };

  handleConfirm() {
    let res: boolean = (this as any).$refs.ruleForm.validate();
    if (res) {
      let { _id, done } = this.ruleForm;
      let data = { _id, done };
      let cb = () => {
        this.$bus.$emit("cancel");
      };
      done && this.saveData(this.$API.featureModel.EditFeature, data , cb);
    }
  }

  beforeDestroy() {
    this.$bus.$off("cancel");
  }
}
</script>
<style lang='scss' scoped>
</style>