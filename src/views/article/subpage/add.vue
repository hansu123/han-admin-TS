<template>
  <div class="add-wrapper">
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
          <el-option label="前端" value="css"></el-option>
          <el-option label="后端" value="javascript"></el-option>
          <el-option label="git" value="javascript"></el-option>
          <el-option label="开发工具" value="javascript"></el-option>
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

      <!--富文本编辑器-->
      <el-form-item>
        <mavon-editor
          style="height:450px"
          v-model="ruleForm.content"
          ref="md"
          @change="changeMavon"
          @imgAdd="$imgAdd"
        ></mavon-editor>
      </el-form-item>
      <!--缩略图-->
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
          ref="upload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="标签" prop="tag">
        <el-tag
          v-for="(elem,index) of tags"
          :key="elem"
          :type="tagActiveIndex===index?'primary':'info'"
          style="margin-right:10px;cursor:pointer"
          @click="changeTag(index)"
        >{{elem}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import marked from "marked";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

interface RuleFormValue {
  title: string;
  cate: string;
  summary: string;
  content: string;
  tag:string;
  fileList: string;
}

import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Add extends Vue {
  fileList: any = [];
  configs: object = {};
  tags: string[] = [];
  tagActiveIndex: number = -1;
  inputVisible: boolean = false;
  inputValue: string = "";
  ruleForm: RuleFormValue = {
    title: "",
    cate: "",
    summary: "",
    content: "",
    tag:"",
    fileList: ""
  };
  rules: object = {
    title: [
      { required: true, message: "请输入文章标题", trigger: "blur" },
      { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
    ],
    cate: [{ required: true, message: "请选择分类", trigger: "change" }],
    summary: [{ required: true, message: "请填写文章简介", trigger: "blur" }]
  };
  changeMavon() {}
  $imgAdd() {}
  handleRemove(file, fileList) {
    console.log(file, fileList);
  }
  handlePreview(file) {
    console.log(file);
  }
  async getTagList(){
    let {tags}=await this.$API.articleModel.GetTagList()
    this.tags=tags
  }
  //切换tag
  changeTag(index) {
    this.tagActiveIndex = index;
    this.$set(this.ruleForm, "tag", this.tags[index]);
  }

  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      (this as any).$refs.saveTagInput.$refs.input.focus();
    });
  }

  handleInputConfirm() {
    if (this.inputValue) {
      this.tags.push(this.inputValue);
    }
    this.inputVisible = false;
    this.inputValue = "";
  }


  //提交文章
  async submitForm(formName) {
    let valid = await (this as any).$refs[formName].validate();
    if (valid) {
      let formData = new FormData();
      let file = (this as any).$refs.upload.uploadFiles[0];
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };

      if (!file) {
        // 若未选择文件
        this.$message({
          message: "请添加文件",
          type: "warning"
        });
        return;
      }
      let { title, cate, summary, content } = this.ruleForm;

      formData.append("file", file.raw);
      formData.append("title", this.$xssFilter.inHTMLData(title));
      formData.append("cate", this.$xssFilter.inHTMLData(cate));
      formData.append("summary", this.$xssFilter.inHTMLData(summary));
      // formData.append("content", this.$xssFilter.inHTMLData(marked(content)));
      formData.append("content", this.$xssFilter.inHTMLData(content));
      console.log(formData.get("file"));
      let d = await this.$API.articleModel.AddArticle(formData, config);
      if (d.code === 0) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "添加失败",
          type: "error"
        });
      }
    } else {
      this.$message({
        message: "请填写正确信息",
        type: "warning"
      });
      return false;
    }
  }
  resetForm(formName) {
    (this as any).$refs[formName].resetFields();
  }

  created() {
    this.getTagList()
  }
}
</script>
<style lang='scss' scoped>
.add-wrapper {
  padding: 0.1rem 0.2rem;
}
</style>
