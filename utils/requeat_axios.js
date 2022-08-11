import axios from "./axios.min.js";

let instance = axios.create({
  baseUrl: "",
  timeout: 5000,
});
// 请求拦截器
instance.interceptors.request.use((config) => {
  console.log(config);
});
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
  });
};
