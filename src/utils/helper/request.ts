import axios,{AxiosResponse,AxiosRequestConfig} from "axios"
import store from "@/store/store"
import {throwErr} from "@/config/codeError"
import {Message} from "element-ui"
let baseURL=process.env.NODE_ENV === 'production'?"http://49.235.18.58:3300/":"http://localhost:3300/"
let request = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL,
  timeout: 2000,
  withCredentials: true
})

request.interceptors.request.use((config:AxiosRequestConfig)=>{
  if(store.state.admintor.token){
    config.headers.Authorization=(store as any).state.admintor.token
  }
  return config
})

request.interceptors.response.use((response:AxiosResponse) =>{
  return response
},(err)=>{
  Message({type:"error",message:throwErr(err.response.status)})
  return Promise.reject(err)
})


export const get = async (url:string, params:any={}) => {
  let d = await request({
    url,
    method: "get",
    params
  })
  return d.data
}

export const post = async (url:string, data:any={}) => {
  let d = await request({
    url,
    method: "post",
    data
  })
  return d.data
}

export const put = (url:string, data:any={}) => {
  return post(url,data)
}

export const patch = (url:string, data:any={}) => {
  return post(url,data)
}

export const _delete = (url:string, data:any={}) => {
  return post(url,data)
}