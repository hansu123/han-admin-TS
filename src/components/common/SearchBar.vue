<template>
  <div class="s-wrapper">
    <el-form :inline="true" :model="searchData" class="searchBar">
      <!--文章列表-->
      <el-form-item v-if="searchData.author!=undefined">
        <el-select v-model="searchData.author" placeholder="作者">
          <el-option
            v-for="item in authorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="searchData.page==='article'&&searchData.cate!=undefined">
        <el-select v-model="searchData.cate" placeholder="类型">
          <el-option
            v-for="item in cateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="searchData.startTime!=undefined">
        <el-date-picker v-model="searchData.startTime" type="date" placeholder="开始日期" @change="handleDate" value-format="timestamp"></el-date-picker>
      </el-form-item>

       <el-form-item v-if="searchData.endTime!=undefined">
        <el-date-picker v-model="searchData.endTime" type="date" placeholder="结束日期" @change="handleDate" value-format="timestamp"></el-date-picker>
      </el-form-item>


      <el-form-item v-if="searchData.deadline!=undefined">
        <el-date-picker v-model="searchData.deadline" type="date" placeholder="截至日期" @change="handleDate" value-format="timestamp"></el-date-picker>
      </el-form-item>

     <!-- 功能 -->
     
      <el-form-item v-if="searchData.page=='feature'&&searchData.level!=undefined">
        <el-select v-model="searchData.level" placeholder="分类">
          <el-option
            v-for="item in featureLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

     <!-- bug -->
     
      <el-form-item v-if="searchData.page=='bug'&&searchData.cate!=undefined">
        <el-select v-model="searchData.cate" placeholder="类型">
          <el-option
            v-for="item in bugCateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </div>
</template>

<script lang="ts">
import {Component,Vue,Prop} from "vue-property-decorator"
@Component({
  components:{
  }
})
export default class SearchBar extends Vue{
  @Prop(Object)
  searchData:any

  authorOptions:any[]=[{ value: "hansu" }, { value: "lilei" }]
  cateOptions:any[]=[{ value: "javascript" }, { value: "html" }]
  featureLevelOptions:any[]=[{ value:0,label:"新功能" }, { value:1,label:"优化"}]
  bugCateOptions:any[]=[{ value:0,label:"UI" }, { value:1,label:"参数错误" },{ value:2,label:"逻辑错误" }]


  handleDate() {
    console.log(this.searchData.postTime);
  }

}
</script>
<style lang="scss" scoped>
.searchBar {
  display: flex;
  flex: 1;
  height:0.8rem;
}
</style>