import www from "../utils/request_ajax.js";
/**
 * 登录
 * @param {*} <Object></Object>
 * @returns
 */
export const login = (params) => {
  return www("/user/login", "post", params);
};
/**
 * 获取商品列表
 * @returns Promise
 */
export const getGoodList = (parpms) => {
  return www("/goods/list", "get", parpms);
};
/**
 *注册接口
 * @param {*} params
 * @returns
 */
export const register = (params) => {
  return www("/user/register", "post", params);
};
/**
 * 收货地址
 * @returns
 */
export const findAddress = () => {
  return www("/address/list", "get");
};
/**
 * 获取省信息
 * @returns
 */
export const findDart = () => {
  return www("/pcct/province", "get");
};
/**
 * 获取城市
 * @param {*} id
 * @returns
 */
export const findCity = (params) => {
  return www("/pcct/city", "get", params);
};
/**
 * 获取区列表
 * @param {*} params
 * @returns
 */
export const findCounty = (params) => {
  return www("/pcct/county", "get", params);
};
/**
 * 获取街道列表
 * @param {*} params
 * @returns
 */
export const findTown = (params) => {
  return www("/pcct/town", "get", params);
};
/**
 * 添加收货地址
 * @param {} params
 * name: "",
  tel: "",
  province_id: "",
  city_id: "",
  county_id: "",
  town_id: "",
  street: "",
  code: "",
  isDefault: "1",
 * @returns
 */
export const addAddress = (params) => {
  return www("/address/add", "post", params);
};
