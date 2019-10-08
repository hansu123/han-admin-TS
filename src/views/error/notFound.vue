<template>
  <div class="error_wrapper">
    <div class="main">
      <div class="err_content">
        <router-link to="/home" class="err_back">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
	mounted() {
		this.$message({
		type:"error",
		message:"访问地址出错，点击下方按钮返回首页"
		})
	},
})
export default class NotFound extends Vue {}
</script>
<style lang='scss' scoped>
.error_wrapper {
  width: 100%;
	height:100%;
	display:flex;
	justify-content: center;
	align-items: center;
  .err_content {
    position: relative;
    width: 11rem;
    height: 6rem;
    margin: 2rem auto 1rem;
    background: {
			image:url("https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/err.jpg");
			repeat:no-repeat;
			position:21px 18px
		}
  }
  .err_back {
    position: absolute;
    top: 5.1rem;
    right: 0.8rem;
    width: 3.1rem;
    height: 0.8rem;
    text-indent: -999px;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>