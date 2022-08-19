import { findAddress } from "../api/index.js";
import { getParams } from "../utils/mixins.js";
let d = document;
let addressList = d.querySelector(".address-list");
let addAddress = d.querySelector(".add-button");
// 获取收货地址
window.onload = async () => {
  const { data } = await findAddress();
  console.log(data);

  data &&
    data.forEach((item) => {
      let html = `<li data-id=${item.id}>
			<div class="info">
				<div class="top">
					<span class="name">${item.name}</span>
					<span class="tel">${item.tel}</span>
					${item.isDefault ? '<div class="default">默认</div>' : ""} 
				</div>
				<div class="detail">
					${item.province_name}${item.city_name}${item.county_name}${item.street}${
        item.town_name
      }
				</div>
			</div>
			<img class="edit" src="../img/address/edit.png" alt="">
			<img class="remove" src="../img/address/remove.png" alt="">
		</li>`;
      //渲染
      addressList.insertAdjacentHTML("beforeend", html);
    });
  addAddress.addEventListener("click", () => {
    location.assign("../views/appendaddress.html");
  });
  addressList.addEventListener("click", (e) => {
    // 点击商品详情有redirect值说明下单页面跳过来的
    let addressId = e.target.closest("li").dataset.id;
    if (getParams("redirect")) {
      sessionStorage.setItem("addressID", addressId);
      history.back();
    }
  });
};
