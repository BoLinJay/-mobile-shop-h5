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
 * @returns
 */
export const addAddress = (params) => {
  return www("/address/add", "post", params);
};
/**
 * 获取用户籽料
 * @returns
 */
export const findUserInfo = () => {
  return www("/user/info", "get");
};
/**
 * 获取分类列表所有分类
 * @returns
 */
export const findCateGory = () => {
  return www("/category/all", "get");
};
export const findCartGorySub = (pid) => {
  return www("/category/sub", "get", { pId: pid });
};
/**
 * 获取商品详情
 * @param {*} id
 * @returns
 */
export const findGoodsDetail = (id) => {
  return www("/goods/detail", "get", { id: id });
};
/**
 *添加购物车
 * @param {*} params
 * gid Number 商品id
 * num Number 商品数量
 * @returns
 */
export const addCart = (params) => {
  return www("/cart/add", "post", params);
};
/**
 * 获取购物车列表
 * @returns
 */
export const findCartList = () => {
  return www("/cart/list", "get");
};
/**
 *购物车商品数量减少
 * @param {*} params
 * @returns
 */
export const CartDecrease = (params) => {
  return www("/cart/decrease", "post", params);
};
/**
 * 购物车商品数量增加
 * @param {*} params
 * @id
 * @num
 * @returns
 */
export const CartIncrease = (params) => {
  return www("/cart/increase", "post", params);
};
/**
 * 确认订单数据
 * @param {*} goods
 * @returns
 */
export const orderSettle = (goods) => {
  return www("/order/settle", "post", { goods: goods });
};
/**
 *生成订单
 * @param {*} params
 * @returns
 */
export const orderCreate = (params) => {
  return www("/order/create", "post", params);
};
