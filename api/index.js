import www from "../utils/request_ajax.js";
/**
 * 登录
 * @param {*} <Object></Object>
 * @returns
 */
export const login = (params) => {
  return www("post", "/user/login", params);
};
/**
 * 获取商品列表
 * @returns Promise
 */
export const getGoodList = (parpms) => {
  return www("/goods/list", "get", parpms);
};
