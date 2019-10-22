import Vue from 'vue';
// 声明全局方法
declare module 'vue/types/vue' {
    interface Vue {
        $echarts:any;
        $lodash: any;
        $API:any;
        $storage:any;
        $bus:any;
        $xssFilter:any;
    }
}

