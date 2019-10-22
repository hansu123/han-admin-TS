<template>
  <div class="home">
    <el-container id="main">
      <el-main class="main_left">
        <div class="card_info_content">
          <el-card class="box-card card_info_item">
            <div class="card_info_item_body">
              <div>
                <p style="font-size:0.3rem">新增用户</p>
                <p style="font-size:0.8rem" class="success">
                  <count-to :startVal="startVal" :endVal="userNum" :duration="duration"></count-to>
                </p>
              </div>
              <div>
                <i class="el-icon-user success" style="font-size:1rem"></i>
              </div>
            </div>
          </el-card>

          <el-card class="box-card card_info_item">
            <div class="card_info_item_body">
              <div>
                <p style="font-size:0.3rem">新增留言</p>
                <p style="font-size:0.8rem" class="primary">
                  <count-to :startVal="startVal" :endVal="messageNum" :duration="duration"></count-to>
                </p>
              </div>
              <div>
                <i class="el-icon-chat-dot-square primary" style="font-size:1rem"></i>
              </div>
            </div>
          </el-card>

          <el-card class="box-card card_info_item">
            <div class="card_info_item_body">
              <div>
                <p style="font-size:0.3rem">新增文章</p>
                <p style="font-size:0.8rem" class="danger">
                  <count-to :startVal="startVal" :endVal="articleNum" :duration="duration"></count-to>
                </p>
              </div>
              <div>
                <i class="el-icon-tickets danger" style="font-size:1rem"></i>
              </div>
            </div>
          </el-card>
        </div>
        <div style="width:100%;height:10rem;overflow:hidden;background:#fff;margin-top:1rem">
          <p-v></p-v>
        </div>
      </el-main>
      <el-aside class="main_right">
        <!-- 用户信息 -->
        <el-card class="box-card card_userInfo_content">
          <div slot="header" class="clearfix">
            <div class="card_userInfo_content_header">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <div style="margin-left:1rem">
                <p style="font-weight:bold">{{roleInfo.name}}</p>
                <p>账号角色:{{roleInfo.identity=="manager"?"管理员":"普通用户"}}</p>
              </div>
            </div>
          </div>
          <div class="card_userInfo_content_body">
            <dl
              v-for="item of blogMainInfo"
              :key="item.title"
              class="card_userInfo_content_body_item"
            >
              <dt>{{item.title}}</dt>
              <dd>{{item.num}}</dd>
            </dl>
          </div>
        </el-card>

        <!-- 注意事项 -->
        <el-card class="box-card task_content" :body-style="{padding:'0'}" style="margin-top:1rem">
          <div slot="header" class="clearfix task_title">
            <div>
              <p>注意事项</p>
            </div>
          </div>
          <div v-for="o in 4" :key="o" class="task_item_container">
            <div class="task_item error">
              <p>{{'待修复bug ' }}</p>
              <p class="task_item_num">{{o}}</p>
            </div>
          </div>
        </el-card>

        <!-- 最新公告 -->
        <el-card
          class="box-card notice_content"
          :body-style="{padding:'0'}"
          style="margin-top:1rem"
        >
          <div slot="header" class="clearfix">
            <span>最新公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="task_item_container">
            <div class="task_item error">
              <p>hansu修复bug</p>
              <p>5分钟前</p>
            </div>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts">
import countTo from "vue-count-to";
import { PV } from "@/components";
import { Getter } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    PV,
    countTo
  }
})
export default class Home extends Vue {
  @Getter("roleInfo") roleInfo;
  duration: number = 5000;
  startVal: number = 0;
  userNum: number = 1877;
  messageNum: number = 1163;
  articleNum: number = 898;

  blogMainInfo: any[] = [
    { title: "文章数量", num: 11 },
    { title: "余额", num: 12 },
    { title: "角色", num: 22 }
  ];
  mounted() {}
}
</script>
<style lang='scss' scoped>
@import "@/styles/mixin.scss";
.home {
  height: 100%;
  @include df-col($jc: center);
  padding: 0.3rem;
  background: #eee;
  box-sizing: border-box;
}

#main {
  width: 100%;
  height: 10rem;
  padding: 0.2rem 0;
  @include df-row($jc: center);
  .main_left {
    flex: 1;
    margin-right: 1rem;
    box-sizing: border-box;
    .card_info_content {
      display: flex;
      width: 100%;
      .card_info_item {
        width: calc(100% / 3);
        margin-right: 1rem;
        box-sizing: border-box;
        padding: 0.2rem 0.5rem;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        &_body {
          @include df-row($jc: space-between);
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .main_right {
    width: 10rem;
    .card_userInfo_content {
      &_header {
        @include df-row($ai: center);
      }
      &_body {
        @include df-row($jc: space-around);
        &_item {
          @include df-col($ai: center);
        }
      }
    }

    //注意事项
    .task_content {
      .task_item_container {
        width: 100%;
        position: relative;
        &:not(:last-child):after {
          content: "";
          height: 1px;
          width: 100%;
          @include p-abs($b: 0, $l: 0);
          background: #ebeef5;
        }
        .task_item {
          width: 100%;
          position: relative;
          @include df-row($jc: space-between);
          padding: 0.1rem 0.8rem;
          &:before {
            content: "";
            border: 2px solid #bbb;
            width: 0.2rem;
            height: 0.2rem;
            box-sizing: border-box;
            @include p-abs($t: 0.2rem, $l: 0.4rem); //1rem===50px
            border-radius: 0.2rem;
          }
          &_num {
            font-size: 18px;
            border-radius: 10px;
            line-height: 24px;
            padding: 0 9px;
            display: inline-block;
            min-width: 28px;
            vertical-align: middle;
            color: red;
          }
        }
        .error {
          &:before {
            border: 2px solid #e54545;
          }
        }
      }
    }

    // 公告
    .notice_content {
      .task_item_container {
        width: 100%;
        position: relative;
        .task_item {
          width: 100%;
          position: relative;
          @include df-row($jc: space-between);
          padding: 0.1rem 0.8rem;
          &:before {
            content: "";
            border: 2px solid #bbb;
            width: 0.2rem;
            height: 0.2rem;
            box-sizing: border-box;
            @include p-abs($t: 0.2rem, $l: 0.4rem); //1rem===50px
            border-radius: 0.2rem;
          }
        }
      }
    }
  }
}
</style>