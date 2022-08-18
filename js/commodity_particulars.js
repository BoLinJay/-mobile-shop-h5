import { findGoodsDetail, addCart } from "../api/index.js";
import { getParams } from "../utils/mixins.js";
window.onload = async () => {
  let d = document;
  let oTitle = d.querySelector(".title");
  let oPrice = d.querySelector(".price");
  let oSwiper = d.querySelector(".swiper");
  let oPurchase = d.querySelector(".purchase");
  let oShoppingTrolley = d.querySelector(".shopping_trolley");
  let oGoBack = d.querySelector("#goBack");
  let oCart = d.querySelector("#cart");
  //   URL数据
  let id = getParams("id");

  const res = await findGoodsDetail(id);
  console.log(res);
  if (res.status) {
    //   名称
    oTitle.innerText = res.data.name;
    //金额
    oPrice.innerText = `￥${res.data.price}`;
    // 图片
    let html = res.data.detail;
    oSwiper.innerHTML = html;
  }
  //   立即购买
  oPurchase.addEventListener("click", () => {
    location.assign("../views/cart.html");
  });
  //   加入购物车参数
  let params = {
    gid: id,
    num: res.data.discount,
  };
  //   加入购物车
  oShoppingTrolley.addEventListener("click", async () => {
    const res = await addCart(params);
    if (res.status) {
      alert("加入购物车成功");
    }
  });
  //   回退
  oGoBack.addEventListener("click", () => {
    history.go(-1);
  });
  //   购物车
  oCart.addEventListener("click", () => {
    console.log(1);
    location.assign("../views/cart.html");
  });
};
