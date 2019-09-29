<template>
  <div class="home-header">
    <el-row :gutter="20">
      <el-col :span="16">
        <bread-crumb></bread-crumb>
      </el-col>
      <el-col :span="8">
        <div class="header-right">
          <div class="screen_content">
            <i class="el-icon-full-screen font-large"></i>
          </div>
          <div class="bell_content">
              <i class="el-icon-bell font-large"></i>
          </div>
          <img
            src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/admin/boy.png"
            class="header-avatar"
          />
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{this.roleInfo.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">
                <i class="iconfont icon-mima"></i>切换密码
              </el-dropdown-item>
              <el-dropdown-item command="signout">
                <i class="iconfont icon-tuichu"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
// import screenfull from "screenfull";
import BreadCrumb from "./BreadCrumb.vue";
import { State, Action, namespace } from "vuex-class";
const admintorModule = namespace("admintor");
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { BreadCrumb }
})
export default class NavBar extends Vue {
  @admintorModule.Action("signOutAction") signOutAction;
  @admintorModule.State("roleInfo") roleInfo;
  options: any[] = [{ value: "zh" }, { value: "en" }];
  language: string = "";

  async handleCommand(command) {
    if (command == "info") {
      console.log("个人信息");
    } else if (command == "signout") {
      let res = await (this as any).$confirm("你确定要退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      if (res) {
        this.signOutAction();
      } else {
        (this as any).$message({
          type: "info",
          message: "已取消"
        });
      }
    }
  }
  changeLanguage() {
    // this.$i18n.locale = this.language;
  }
  // isScreenFull() {
  //   if (!screenfull.enabled) {
  //     // 如果不允许进入全屏，发出不允许提示
  //     this.$message({
  //       message: "不支持全屏",
  //       type: "warning"
  //     });
  //     return false;
  //   }
  // screenfull.toggle();
  // // this.$message({
  // //     message: '全屏啦',
  // //     type: 'success'
  // //  })
  // },
  handleCollapse() {
    this.$emit("handleCollapse");
  }
}
</script>
<style lang='scss' scoped>
@import "@/styles/mixin.scss";
@import "@/styles/global.scss";
.home-header {
  padding: 0 0.2rem;
  color: #fff;
  font-size: 0.5rem;
  line-height: 1.2rem;
  height: 1.2rem;
  background: $g-theme-color;
  .header-right {
    @include df-row($jc: flex-end, $ai: center);
    font-size: 0.3rem;
    margin-right: 0.2rem;
    .screen_content{
      @include df-row($ai:center);
      margin-right: 0.3rem;
    }
    .bell_content{
      @include df-row($ai:center);
      margin-right: 0.3rem;
      position: relative;
      &:after{
        content:"";
        position:absolute;
        top:0;
        right:0;
        background:$g-color-danger;
        width:0.2rem;
        height:0.2rem;
        border-radius:50%;
      }
    }

    .header-avatar {
      margin-right: 0.1rem;
      height: 0.8rem;
      cursor: pointer;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }

    .el-icon-arrow-down {
      font-size: 0.3rem;
    }
  }
}
</style>