/**

* 发送一个 AJAX 请求
* @param {String}  method 请求方法* @param {String}  url   请求地址* @param {Object}  params 请求参数
* @param {Function} done  请求完成过后需要做的事情（委托/回调）

*/
export default function www(url, method, params) {
  return new Promise((resolve, reject) => {
    let baseURL = "http://localhost:3002" + url;
    // 统一转换为大写便于后续判断
    method = method.toUpperCase();
    // 对象形式的参数转换为 urlencoded 格式
    let pairs = [];
    var querystring = "";
    for (let key in params) {
      // 判断是否数组形式传参
      if (!Array.isArray(params[key])) {
        pairs.push(key + "=" + params[key]);
      } else {
        params[key].forEach((item) => {
          pairs.push(`goods=${item}`);
        });
      }
    }
    querystring = pairs.join("&");
    let xhr = new XMLHttpRequest();

    if (method === "GET") {
      // 如果是 GET 请求就设置 URL 地址 问号参数
      if (querystring) {
        baseURL += "?" + querystring;
      }
    }

    xhr.open(method, baseURL);
    // 判断是否有token，并携带token
    //! 注意：setRequestHeader必须放在open后面
    let token = window.sessionStorage.getItem("APP_token");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    // 如果是 POST 请求就设置请求体
    var data = null;
    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      data = querystring;
    }
    xhr.send(data);
    // 指定xhr状态变化事件处理函数
    // 执行回调函数
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 返回的应该是一个对象，这样客户端更好渲染
        let result = JSON.parse(xhr.responseText);
        // console.log(JSON.parse(xhr.responseText));
        // 判断是否有token存储token到本地
        if (result.data && result.data.token) {
          // console.log(result.data.token);
          window.sessionStorage.setItem("APP_token", result.data.token);
        }
        resolve(JSON.parse(xhr.responseText));
        return;
      }
      if (xhr.status === 401) {
        let search = location.search;
        let url = location.pathname;
        if (search) {
          url = url + search;
        }
        console.log(url);
        location.assign(`../views/login.html?replace=${url}`);
      }
      if (xhr.status !== 200) {
        reject(new Error("错误"));
        return;
      }
    });
  });
}
