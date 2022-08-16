// 获取路由参数---兼容IE
function query(key) {
  // 切除问号前面的字符
  var params = location.search.slice(1);
  // string => array
  var arr = params.split("&");
  // 遍历数组
  var result = {};
  arr.forEach(function (item) {
    var temp = item.split("=");
    result[temp[0]] = temp[1];
  });
  return result[key];
}

// 获取路由参数---IE不支持
export function getParams(key) {
  return new URLSearchParams(location.search).get(key);
}
