import { getGoodList } from "../api/index.js";

let d = document;
let oInput = d.querySelector(".input");
let oBtn = d.querySelector(".button");
let oMenu = d.querySelector(".menu");
window.onload = () => {
  // 搜索按钮
  oBtn.addEventListener("click", () => {
    let value = oInput.value;
    location.assign(`../views/searchresult.html?keyword=${value}`);
  });
};
