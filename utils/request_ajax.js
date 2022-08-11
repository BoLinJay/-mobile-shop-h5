/**

* 发送一个 AJAX 请求
* @param {String}  method 请求方法* @param {String}  url   请求地址* @param {Object}  params 请求参数
* @param {Function} done  请求完成过后需要做的事情（委托/回调）

*/
export default function www(method, url, params) {
  return new Promise((resolve, reject) => {
    URL = "http://localhost:3002" + url;
    // 统一转换为大写便于后续判断
    method = method.toUpperCase();
    // 对象形式的参数转换为 urlencoded 格式
    var pairs = [];
    for (var key in params) {
      pairs.push(key + "=" + params[key]);
    }

    var querystring = pairs.join("&");
    var xhr = new XMLHttpRequest();

    // 如果是 GET 请求就设置 URL 地址 问号参数
    if (method === "GET") {
      URL += "?" + querystring;
    }

    xhr.open(method, URL);
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
        resolve(JSON.parse(xhr.responseText));
        return;
      }
      if (xhr.status !== 200) {
        reject(new Error("错误"));
        return;
      }
    });
  });
}
