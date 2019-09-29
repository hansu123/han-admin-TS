const planLevelFilter=(val:number):string=>{
  switch(val){
    case 0:return "新功能";
    case 1:return "优化";
    default:return "";
  }
}

const planIsDownFilter=(val:boolean):string=>val?"已解决":"未解决"

//bug页面分类过滤器
const bugCateFilter=(val:number):string=>{
  switch(val){
    case 0:return "UI";
    case 1:return "参数错误";
    case 2:return "逻辑错误";
    default:return "";
  }
}

//bug页面状态过滤器
const bugStatusFilter=(val:number):string=>{
  switch(val){
    case 0:return "未修改";
    case 1:return "修改中";
    case 2:return "已提交";
    case 3:return "已确认";
    default:return "";
  }
}


//bug页面tag类型过滤器
const statusTagTypeFilter=(val:number):string=>{
    switch(val){
      case 0:return "danger";
      case 1:return "warning";
      case 2:return "primary";
      case 3:return "success";
      default:return "";
    }
}

//时间格式过滤器
const dateFilter=(val:string):string=>{
  let str=new Date(val).toLocaleDateString()
  return str.split("/").map(time=>{
     return time.length<2?time.padStart(2,'0'):time
  }).join("-")
}

//用户身份过滤器
const userIdentityFilter=(val:string):string=>{
  switch(val){
    case '0':return "普通用户";
    case '1':return "VIP";
    default:return "";
  }
}


export default {
  planLevelFilter,
  planIsDownFilter,
  bugCateFilter,
  bugStatusFilter,
  statusTagTypeFilter,
  dateFilter,
  userIdentityFilter
}