<template>
  <div class="wrapper">
    <vue-particles
      color="#0f2"
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
          <h2 class="sign-title">后台登录系统</h2>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="ruleForm.name"
                type="text"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" class="signin-button">立即登陆</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
                <el-checkbox label="15天自动登录" name="type"></el-checkbox>
              </el-checkbox-group>
              <p class="admin">测试账号:admin 密码:123456</p>
            </el-form-item>
          </el-form>
        </div>
        <div class="signup-item">
          <span>
            还没有账号，
            <router-link to="/signUp">立即注册</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
const admintor = namespace("admintor");
@Component({
  components: {}
})
export default class signIn extends Vue {
  @admintor.Action("checkLogin") checkLogin;
  @Getter('token') token;
  @Provide() ruleForm: { name: string; password: string; type: any[] } = {
    name: "",
    password: "",
    type: []
  };
  rules: object = {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
    ]
  };

  @Provide() loading: boolean = false;
  submitForm(formName: string) {
    this.loading = true;
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.checkLogin(this.ruleForm);
      } else {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请仔细核对信息后再提交"
        });
      }
    });
  }

  mounted() {
    const h = this.$createElement;
    !this.token&&this.$notify({
      title: "提示",
      message: h(
        "div",
        { style: "color: teal" },
        [h('p',{},"目前角色有两个"),h('p',{},"账号:admin，密码:123456")]
      )
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  justify-content: center;
}
#particles-js {
  // background: rgb(189, 163, 163);
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
