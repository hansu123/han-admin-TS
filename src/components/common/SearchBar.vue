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
        <el-date-picker v-model="searchData.startTime" type="date" placeholder="开始日期" value-format="timestamp"></el-date-picker>
      </el-form-item>

       <el-form-item v-if="searchData.endTime!=undefined">
        <el-date-picker v-model="searchData.endTime" type="date" placeholder="结束日期" value-format="timestamp"></el-date-picker>
      </el-form-item>


      <el-form-item v-if="searchData.deadline!=undefined">
        <el-date-picker v-model="searchData.deadline" type="date" placeholder="截至日期" value-format="timestamp"></el-date-picker>
      </el-form-item>

     <!-- 功能 -->
     
      <el-form-item v-if="searchData.page=='feature'&&searchData.cate!=undefined">
        <el-select v-model="searchData.cate" placeholder="分类">
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

  authorOptions:any[]=[{ value: "hansu",label:"hansu" }, { value: "lilei" ,label:"lilei"}]
  cateOptions:any[]=[{ value: "javascript",label:"javascript" }, { value: "html",label:"html" }]
  featureLevelOptions:any[]=[{ value:"新功能",label:"新功能" }, { value:"优化",label:"优化"}]
  bugCateOptions:any[]=[{ value:"UI",label:"UI" }, { value:"参数错误",label:"参数错误" },{ value:"逻辑错误",label:"逻辑错误" }]

}
</script>
<style lang="scss" scoped>
.searchBar {
  display: flex;
  flex: 1;
  height:0.8rem;
}
</style>