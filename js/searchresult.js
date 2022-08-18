import { getGoodList } from "../api/index.js";
import { getParams } from "../utils/mixins.js";
let d = document;
let content = d.querySelector(".content");
let oGoBack = d.querySelector("#goback");
let oInput = d.querySelector(".input");
let oBtn = d.querySelector(".button");
window.onload = () => {
  // 回退
  oGoBack.addEventListener("click", () => {
    history.go(-1);
  });
  // 参数
  let params = {
    pageSize: 10,
    pageIndex: 1,
  };
  // 搜获取URL上的keyword
  let keyword = getParams("keyword");
  if (keyword) {
    params.keyword = keyword;
    oInput.value = keyword;
  }
  // 搜索文本框防抖
  let timer = 0;
  oInput.addEventListener("keyup", () => {
    let value = oInput.value;
    params.keyword = value;
    if (timer) {
      clearTimeout(timer);
    }
    let res = [];
    timer = setTimeout(async () => {
      res = await getGoodList(params);
      console.log(res.data);
      render(res.data);
      timer = 0;
    }, 500);
  });
  // 获取商品列表
  getGoodList(params).then(({ data }) => {
    render(data);
  });
  // 搜索按钮
  oBtn.addEventListener("click", async () => {
    let value = oInput.value;
    let res = await getGoodList(params);
    render(res.data);
  });
};
// 渲染DOM
const render = (data) => {
  // 清空DOM
  clearNodes();
  let innerHtml = "";
  data &&
    data.forEach((item) => {
      let html = `<li id=${item.id}>
                <img src=${item.img_md} alt="">
                <div class="content_right">
                    <p class="title">${item.name}</p>
                    <p class="text">${item.hotPoint}</p>
                    <p class="money">￥<span>${item.price}</span></p>
                    <div class="border"></div>
                </div>
            </li>`;
      innerHtml += html;
    });
  content.insertAdjacentHTML("beforeend", innerHtml);
};
// 清空DOM
const clearNodes = () => {
  let nodes = content.children;
  // 转换数组
  let arr = Array.from(nodes);
  arr.forEach((item) => {
    item.remove(item);
  });
};
// 点击商品跳转商品详情
content.addEventListener("click", (e) => {
  console.log(e.target.closest("li").id);
  let id = e.target.closest("li").id;
  location.assign(`../views/commodity_particulars.html?id=${id}`);
});
