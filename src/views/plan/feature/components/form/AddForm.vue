<template>
  <div>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="分类" prop="cate">
          <el-select v-model="ruleForm.level" placeholder="请选择">
            <el-option label="新功能" value="0"></el-option>
            <el-option label="优化" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input type="textarea" :rows="2" v-model="ruleForm.describe" maxlength="100" />
        </el-form-item>

        <el-form-item label="创建者" prop="creator">
          <el-input v-model="ruleForm.creator" inline />
        </el-form-item>

        <el-form-item label="负责人" prop="name">
          <el-select v-model="ruleForm.name" placeholder="请选择">
            <el-option label="hansu" value="hansu"></el-option>
            <el-option label="zhangsan" value="zhangsan"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="截至日期" prop="deadline">
          <el-date-picker v-model="ruleForm.deadline" type="date" placeholder="选择日期" value-format="timestamp"></el-date-picker>
        </el-form-item>

        <slot></slot>
      </el-form>
  </div>
</template>

<script lang="ts">
import formMixin from "@/mixins/form";
import { Component, Vue, Prop, Watch, Mixins } from "vue-property-decorator";
@Component({})
export default class AddForm extends Mixins(formMixin) {
  ruleForm: any = {
    level: "",
    title: "",
    describe: "",
    creator: "",
    deadline: "",
    name: "",
    done: false
  };

  rules: object = {
    level: [{ required: true, message: "等级不能为空" }],
    title: [{ required: true, message: "标题不能为空" }],
    describe: [{ required: true, message: "描述不能为空" }],
    creator: [{ required: true, message: "创建者不能为空" }],
    deadline: [{ required: true, message: "截止日期不能为空" }],
    name: [{ required: true, message: "负责人不能为空" }]
  };

  async _saveData() {
    let res=await (this as any).$refs.ruleForm.validate()
    let query = {
      ...this.ruleForm
    };
    if(res){
      return this.saveData((this as any).$API.featureModel.AddFeature,query)
    }
  }

  beforeDestroy() {
    (this as any).$bus.$off("cancel")
  }
}
</script>
<style lang='scss' scoped>
</style>