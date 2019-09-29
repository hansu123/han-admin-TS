<template>
<div class="wrapper">
   <vue-particles
      color="#000"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizhi"
    ></vue-particles>
    <div class="sign-wrapper">
    <div class="sign-container">
      <div class="sign-body">
        <h2 class="sign-title">注册后台账号</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input v-model="ruleForm.checkpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认身份" prop="identity">
            <el-select v-model="ruleForm.identity">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="普通用户" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="signup-item">
        <span>
          已有账号，
          <router-link to="/signIn">立即登录</router-link>
        </span>
      </div>
    </div>
  </div>
</div>
  
</template>

<script lang="ts">
import {Action,namespace} from "vuex-class"
const admintorModule=namespace("admintor")
import {Component,Vue} from "vue-property-decorator"
@Component({
  components:{

  }
})
export default class SignUp extends Vue{
  @admintorModule.Action("signUpAction") signUpAction;
  ruleForm:any={
    name: "",
    password: "",
    checkpass: "",
    identity: ""
  }
  rules:any={
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
    ],
    checkpass: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
    ],
    identity: [{ required: true, message: "请确认身份", trigger: "change" }]
  }

  submitForm(formName) {
    (this as any).$refs[formName].validate(valid => {
        if (valid) {
          let {checkpass,...data}=this.ruleForm
          console.log(data)
          this.signUpAction(data)
        } else {
          console.log("请核对好信息后再次提交");
          return false;
        }
      });
  }
  resetForm(formName) {
     (this as any).$refs[formName].resetFields();
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper{
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    justify-content: center;
}
#particles-js {
    background: rgb(189, 163, 163);
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
}
.sign-wrapper {
  .sign-container {
    width: 17rem;
    height: 8rem;
    position: relative;
    display: flex;
    border-radius: 0.1rem;
    background: url("https://cdn.wilddog.com/www-nd/images/account/signup_bg-5ff4429982.jpg")
      no-repeat;
    background-size: 100% 100%;

    .sign-body {
      width: 8rem;
      height: 10rem;
      position: absolute;
      top: -1rem;
      left: 1rem;
      background: #fff;
      box-shadow: 0 0 0.3rem #ccc;

      .sign-title {
        color: #332;
        font-size: 0.5rem;
        margin-top: 1.5rem;
        text-align: center;
      }

      .admin {
        color: #ccc;
        text-align: center;
      }

      .demo-ruleForm {
        margin-top: 1rem;
        width: 7rem;
        height: 7rem;

        .signin-button {
          width: 100%;
        }
      }
    }

    .signup-item {
      position: absolute;
      right: 2rem;
      bottom: 1rem;
      color: #afafaf;
      font-size: 0.3rem;
      align-self: center;
    }
  }
}
</style>
