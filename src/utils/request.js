import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios, 赋给变量 service
// 手把手撸码前端API，地址 http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
    baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
    timeout: 15000,   // 超时
    // 网络请求接口，假设 5000
    // 1000 2000，
});



/**
 * 添加请求拦截器
 * --------------------{{ 请求接口前 }}，做一些数据处理 ( 请求拦截器 )--------------
 *    业务需求 ：
 *             后台需要前端这边传相关的参数 ( 在请求添加参数 )
 *             1.token
 *             2.userId
 *             3.sui
 *             --- config.headers['token'] = '11111'
 *             --- config.headers['userId'] = '2222'
 *             --- config.headers['sui'] = '3333'
 * */
service.interceptors.request.use(function (config) {
    console.log(config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
/**
 * 添加响应拦截器
 * --------------------{{ 请求接口后 }}，返回数据进行拦截（响应拦截器）--------------
 * */
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    // 业务需求

    if(data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;   // return Promise.resolve(data);
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;
