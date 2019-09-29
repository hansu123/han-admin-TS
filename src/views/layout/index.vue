<template>
  <div class="admin-wrapper">
    <el-container class="admin-content">
      <el-aside class="home-sider">
        <home-sider :isCollapse="isCollapse"></home-sider>
      </el-aside>

      <el-container class="home-body">
        <el-header>
          <nav-bar @handleCollapse="changeSiderStatus"></nav-bar>
        </el-header>
        <keep-alive>
          <el-main>
            <!-- <menu-tab></menu-tab> -->
            <div style="position:absolute;top:2.2rem;bottom:0;left:0;right:0;padding:0.5rem">
              <transition name="component-fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </el-main>
        </keep-alive>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { NavBar, HomeSider, MenuTab } from "./components";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    NavBar,
    HomeSider,
    MenuTab
  }
})
export default class Index extends Vue {
  isCollapse: boolean = false;
  changeSiderStatus() {
    this.isCollapse = !this.isCollapse;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.admin-wrapper {
  @include p-abs($t: 0, $b: 0, $l: 0, $r: 0);
  @include df-col();
  .admin-content {
    flex: 1;
    @include df-row($ai: stretch);
    .el-aside {
      width: 5rem !important;
    }
    .home-sider {
      width: 5rem;
      a {
        color: #fff;
        font-size: 0.3rem;
      }
    }
    .home-body {
      flex: 1;
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: scroll;
      padding: 0.2rem;
      box-sizing: border-box;
      @include df-col();
    }
  }
}
</style>