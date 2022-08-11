import { getGoodList } from "../api/index.js";

window.onload = () => {
  let d = document;
  let content = d.querySelector(".content");
  let params = {
    pageSize: 10,
    pageIndex: 1,
  };
  // 获取商品列表
  getGoodList(params).then(({ data }) => {
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
      content.insertAdjacentHTML("beforeend", html);
    });
  });
};
