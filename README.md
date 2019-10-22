# Han-Vue-Admin-TS

![](https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png)



![](<https://img.shields.io/badge/%E8%84%9A%E6%89%8B%E6%9E%B6-vue--cli3-brightgreen>)![](<https://img.shields.io/badge/%E7%89%88%E6%9C%AC-v1.0.0-brightgreen>)![](<https://img.shields.io/badge/developer-hansu-brightgreen>)



### 在线预览地址

[49:8080](49:8080)



# VUE-TS

### 1. @Component

```js
import {componentA,componentB} from '@/components';

export default{
    components:{
        componentA,
        componentB,
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el) {
                el.focus()
            }
        }
    }
}
```

ts写法

```js
import {Component,Vue} from 'vue-property-decorator';
import {componentA,componentB} from '@/components';

 @Component({
    components:{
        componentA,
        componentB,
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el) {
                el.focus()
            }
        }
    }
})
export default class YourCompoent extends Vue{
   
}
```

### 2. @Prop 父子组件之间值的传递

js写法

```js
export default{
    props:{
        propA:String, // propA:Number
        propB:[String,Number],
        propC:{
            type:Array,
            default:()=>{
                return ['a','b']
            },
            required: true,
            validator:(value) => {
                return [
                    'a',
                    'b'
                 ].indexOf(value) !== -1
        }
    }
}
}
```

ts写法

```js
import {Component,Vue,Prop} from vue-property-decorator;

@Component
export default class YourComponent extends Vue {
    @Prop(String)
    propA:string;
    
    @Prop([String,Number])
    propB:string|number;
    
    @Prop({
     type: String, // type: [String , Number]
     default: 'default value', // 一般为String或Number
      //如果是对象或数组的话。默认值从一个工厂函数中返回
      // defatult: () => {
      //     return ['a','b']
      // }
     required: true,
     validator: (value) => {
        return [
          'InProcess',
          'Settled'
        ].indexOf(value) !== -1
     }
    })
    propC:string;   
}
```

### 3. @Watch

js写法

```js
export default {
  watch: {
    'person': {
      handler: (val, oldVal) { },
      immediate: true,
      deep: true
    }
  }
}
```

ts写法

```js
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue{
    @Watch('person', { immediate: true, deep: true })
    onPersonChanged(val: Person, oldVal: Person) { }
}
```

### 4. @Emit

> 由@Emit $emit 定义的函数发出它们的返回值，后跟它们的原始参数。 如果返回值是promise，则在发出之前将其解析。

> 如果事件的名称未通过事件参数提供，则使用函数名称。 在这种情况下，camelCase名称将转换为kebab-case。

js写法

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('addToCount', n)
    }
  }
}
```

ts写法

```js
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
    return n//传参
  }
}
```

注意：

父组件中子组件的方法名不能写成驼峰的形式，要拆成小写的形式

`@addToCount=""=>@add-to-count=""`

### 5. @Provide  提供  /  @Inject  注入

> 注：父组件不便于向子组件传递数据，就把数据通过Provide传递下去，然后子组件通过Inject来获取

js写法

```js
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({

  inject: {
    foo: 'foo',
    bar: 'bar',
    'optional': { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data () {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})

```

ts写法

```js
import {Vue,Component,Inject,Provide} from 'vue-property-decorator';

const symbol = Symbol('baz')

@Component
export defalut class MyComponent extends Vue{
    @Inject()
    foo!: string;
    
    @Inject('bar')
    bar!: string;
    
    @Inject({
        from:'optional',
        default:'default'
    })
    optional!: string;
    
    @Inject(symbol)
    baz!: string;
    
    @Provide()
    foo = 'foo'
    
    @Provide('bar')
    baz = 'bar'
}

```

### 6.data

js写法

```js
export default {
  data() {
    return {
      count: 0
    }
  }
}

```

ts写法

```tsx
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count:number = 0
}

```

### 7.计算属性

js写法

```js
export default {
  computed:{
      money(){
        return `${this.price}*${this.num}元`  
      }
  }
}

```

ts写法

```js
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
    get money(){
        return `${this.price}*${this.num}元` 
    }
  
}

```



# 项目中关于TS的一些坑

## 第三方库的验证

```ts
(this as any).$refs[formName] 
```

```ts
import dejwt from 'jwt-decode'
会报错，因为第三方类库并没有ts的.d.ts 类型的声明文件
安装@types/jwt-decode即可
```



## 原型方法的声明

上述讲到对于在原型上挂载的对象，直接使用会报错`Property xx does not exist`，必须用如下方式

```js
(this as any).$refs[formName] 
```

要想直接使用，我们需要创建一个d.ts文件进行声明

```js
import Vue from 'vue';
// 声明全局方法
declare module 'vue/types/vue' {
    interface Vue {
        $Message: any;
        $lodash: any;
        $API:any;
        $storage:any;
    }
}
```

这样就可以正常使用了



## 组件注意事项

#### 1.每个组件中必须得加

```ts
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
```

没有需要引入的组件的话就简写成：

```ts
import { Component, Vue } from "vue-property-decorator";
@Component({})
```

不然不会报错，但是会有莫名其妙的bug，比如elem表单无法输入

#### 2.!:的用法

```ts
@Prop(Boolean) isCollapse:boolean
```

通常这么写会报错
`has no initializer and is not definitely assigned in the constructor`
意思是没有初始化，此时我们可以

```ts
@Prop(Boolean) isCollapse!:boolean
```

意思就是你不用管我有没有初始化



## vuex的用法

有命名空间

```js
import { Action, namespace } from "vuex-class";
const admintor = namespace("admintor");
export default class signIn extends Vue {
  @admintor.Action("checkLogin") checkLogin;
  @someModule.Getter('foo') moduleGetterFoo
  handleLogin(){
      this.checkLogin()
  }
}

```

无命名空间

```js
import { State,Getter,Action,Mutation, namespace } from "vuex-class";
const admintor = namespace("admintor");
export default class signIn extends Vue {
  @State('userName') userName
  @Getter('getUserName') getUserName
  @Action('foo') actionFoo
  @Mutation('setUserName') setUserName
  mounted(){
      console.log(this.userName)
  }
}

```

[vuex-class（npm）地址](<https://www.npmjs.com/package/vuex-class>)



## axios拦截器的写法

```js
import axios,{AxiosResponse,AxiosRequestConfig} from "axios"
request.interceptors.request.use((config:AxiosRequestConfig)=>{
  console.log(config)
  return config
})

request.interceptors.response.use((response:AxiosResponse) =>{
  console.log(response.status)
  return response
},(err)=>{
  console.log(err.response.status)
})

```



参考文档

[github地址](<https://github.com/kaorun343/vue-property-decorator>)

[vue项目基础上使用ts](<https://juejin.im/post/5ba75b355188255c5e66e4d3>)



装饰器的本质就是把内部所有的东西转化成vue的参数从而转为为vue的组件的构造函数



# 页面部分内容请移植电子档

当然还么有全部更新完

[全栈手册](<http://hansu.gitee.io/blog-docs/>)








