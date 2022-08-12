import { findUserInfo } from "../api/index.js";
let d = document;
let via = d.querySelector("#via");
let name = d.querySelector("#name");
let address = d.querySelector("#address");
let oInstall = d.querySelector("#install");
window.onload = () => {
  findUserInfo().then(
    (res) => {
      console.log(res);
      // 头像
      via.src = res.data.avatar;
      // 名字
      name.innerText = res.data.nickname;
    },
    (e) => {
      throw new Error(e.msg);
    }
  );
  // 收货地址
  address.addEventListener("click", () => {
    location.assign("../views/address.html");
  });
  // 设置按钮
  oInstall.addEventListener("click", () => {
    location.assign("../views/information.html");
  });
};
