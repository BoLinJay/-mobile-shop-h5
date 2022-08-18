import { orderSettle } from "../api/index.js";
import { getParams } from "../utils/mixins.js";
let d = document;
let OrderList = d.querySelector(".order_item");
let oAddress = d.querySelector(".address_content");
let oPriceAll = d.querySelector(".option_total");
let oPriceAll_ = d.querySelector("#priceAll");
let oSubmit = d.querySelector(".button_order");
// 生成订单参数
let params = {
  payment: 0,
  addressId: "",
  goodsList: [],
};
// 金额
let price = 0;
window.onload = async () => {
  console.log(params);
  // 总金额
  try {
    let goods = getParams("goods");
    const { data } = await orderSettle(goods);
    console.log(data);
    // 收货地址id
    params.addressId = data.address.id;
    // 商品
    data.goods.forEach((item) => {
      params.goodsList.push({
        // 商品id
        id: item.id,
        // 商品数量
        num: item.goods_num,
      });
    });
    // 渲染商品列表
    let innerHTML = "";
    data.goods &&
      data.goods.forEach((item) => {
        let goodsListHtml = `    <li>
            <div class="list_box" data-id="${item.id}">
                <img class="list_img" src="${item.img_md}" alt="">
                <div class="list">
                    <div class="title">${item.name}</div>
                    <div class="quantity">${item.goods_num}</div>
                    <div class="price">${item.price}</div>
                </div>
            </div>
        </li>`;
        price += +item.price;
        innerHTML += goodsListHtml;
      });

    OrderList.innerHTML = innerHTML;
    // 总金额渲染
    oPriceAll.innerText = `￥${price}`;
    oPriceAll_.innerText = `￥${price}`;
    params.payment = price.toFixed(2);
    console.log(price.toFixed(2));
    // 是否有默认地址
    let addressHtml = "";
    if (data.address) {
      addressHtml = ` <div class="harvest_address">
            <div class="message">
                <div>${data.address.name}</div>
                <div>${data.address.tel}</div>
                <div class="default">默认</div>
            </div>
            <div class="order_address">${
              data.address.province_name +
              data.address.city_name +
              data.address.county_name +
              data.address.town_name
            }</div>
        </div>`;
    } else {
      addressHtml = `<div class="unfinished_order">没有收货地址? 点我去添加</div>`;
    }
    oAddress.innerHTML = addressHtml;
  } catch (error) {
    throw new Error(error);
  }

  //   下单
  oSubmit.addEventListener("click", () => {
    //   生成订单
    axios.post("http://127.0.0.1:5500/order/create", params).then((res) => {
      console.log(res);
    });
  });
};
