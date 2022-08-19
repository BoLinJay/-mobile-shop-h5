import { getAddressDetails, orderSettle } from "../api/index.js";
import { getParams } from "../utils/mixins.js";
let d = document;
let OrderList = d.querySelector(".order_item");
let oAddress = d.querySelector(".address_content");
let oPriceAll = d.querySelector(".option_total");
let oPriceAll_ = d.querySelector("#priceAll");
let oSubmit = d.querySelector(".button_order");
let oAddressTo = d.querySelector(".address_choose");
// 生成订单的参数
let params = {
  payment: 0,
  addressId: "",
  goodsList: [],
};
// 金额
let price = 0;
window.onload = async () => {
  // 总金额
  try {
    let goods = getParams("goods")
      .split(",")
      .map((item) => {
        return parseInt(item);
      });
    const { data } = await orderSettle(goods);
    console.log(data);
    // 收货地址id
    params.addressId = data.address.id + "";
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

    //  判断是否是重新选择的地址
    let id = sessionStorage.getItem("addressID");
    if (id) {
      // 收货地址id
      params.addressId = id + "";
    }
    let newAddress = await getAddressDetails(id);
    // 判断渲染的地址数据是重新选择的还是默认的
    let addrestResult = newAddress ? newAddress.data : data.address;
    let addressHtml = "";
    if (addrestResult) {
      addressHtml = ` <div class="harvest_address">
            <div class="message">
                <div>${addrestResult.name}</div>
                <div>${addrestResult.tel}</div>
                <div class="default">默认</div>
            </div>
            <div class="order_address">${
              addrestResult.province_name +
              addrestResult.city_name +
              addrestResult.county_name +
              addrestResult.town_name
            }</div>
        </div>`;
    } else {
      // 否有默认地址
      addressHtml = `<div class="unfinished_order">没有收货地址? 点我去添加</div>`;
    }
    // 渲染
    oAddress.innerHTML = addressHtml;
  } catch (error) {
    throw new Error(error);
  }

  //   下单
  oSubmit.addEventListener("click", () => {
    console.log(params);
    //   生成订单
    axios.post("http://127.0.0.1:5500/order/create", params).then((res) => {
      console.log(res);
    });
  });
  // 寄送至
  oAddressTo.addEventListener("click", () => {
    location.assign(`../views/address.html?redirect=confirm-order`);
  });
};
