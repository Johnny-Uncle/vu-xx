import Vue from "vue";
import SvgIcons from '../icons/SvgIcon'
// 自定义全局组件
    Vue.component('svg-icon',SvgIcons);

/*
*  require.context: 读取指定目录的所有文件（ './svg', false, /\.svg$/）
*  './svg' 第一个：目录
*   false  第二个：是否遍历子级目录
*  /\.svg&/ 第三个遍历文件规则
* */
// ---------------------------------------- svg 解析文件  --------------------------------------------------
const req = require.context('./svg', false, /\.svg$/);
// es6
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);
