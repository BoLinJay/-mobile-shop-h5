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
  // 搜索页面跳转过来的keyword
  let keyword = getParams("keyword");
  if (keyword) {
    params.keyword = keyword;
    oInput.value = keyword;
  }
  // 搜索文本框
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
      // render(res.data);
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
    render();
  });
};
// 渲染
const render = (data) => {
  // 清空DOM
  let nodes = content.children;
  let arr = Array.prototype.slice.call(nodes, 0);
  console.log(arr);
  let innerHtml = "";

  data &&
    data.forEach((item) => {
      let html = `<li>
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
  let lis = content.querySelectorAll("li");
  console.log(lis);
};
