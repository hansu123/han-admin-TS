<template>
  <div class="home-sider">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#CBC3A6"
          :collapse="isCollapse"
          :default-active="$route.name"
        >
          <div class="header-title">
            <img
              src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
              class="home-logo"
            />博客后台管理系统
          </div>
          <template v-for="(route,i) of allRoute[0].children">
            <el-submenu :index="route.name" v-if="route.children">
              <template slot="title">
                <i :class="route.meta.icon"></i>
                <span style="margin-left:0.1rem">{{convertTitle(route.meta.title)}}</span>
              </template>

              <el-menu-item-group v-for="(elem,i) of route.children" :key="i">
                <router-link :to="elem.path" :key="elem.name">
                  <el-menu-item
                    :index="elem.name"
                    v-if="!elem.children"
                  >{{convertTitle(elem.meta.title)}}</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <router-link :to="route.path" :key="route.name">
              <el-menu-item :index="route.name" v-if="!route.children">
                <i :class="route.meta.icon"></i>
                <span slot="title" style="margin-left:0.1rem">{{convertTitle(route.meta.title)}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import asyncRoute from "@/router/asyncRouter";
import { State, namespace } from "vuex-class";
const admintorModule = namespace("admintor");
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Sider extends Vue {
  @admintorModule.State("allRoute") allRoute;
  @Prop(Boolean) isCollapse!: boolean;

  mounted() {
    console.log(this.allRoute);
  }
  handleOpen(key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose(key, keyPath) {
    console.log(key, keyPath);
  }
  convertTitle(value) {
    return (this as any).$t("siderBar." + value);
  }
}
</script>
<style lang="scss" scoped>
.home-sider {
  height: 100%;
  .tac {
    height: 100%;
    .header-title {
      color:#fff;
      padding:0.2rem;
      .home-logo {
        width: 1rem;
        height: 1rem;
        margin-right: 0.1rem;
        vertical-align: middle;
      }
    }
  }
  .el-menu-vertical-demo {
    height: 100vh;
  }
  a {
    color: #fff;
  }
  a:visited {
    color: #fff;
  }
}
</style>