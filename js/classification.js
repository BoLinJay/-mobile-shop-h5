import { findCateGory, findCartGorySub } from "../api/index.js";

let d = document;
let oOneCart = d.querySelector(".classification");
let oA = oOneCart.querySelector("li a");
let oBigImg = d.querySelector(".big-photo");
let oTitle = d.querySelector(".title");
let oImg = d.querySelector(".content-photo");
let oText = d.querySelector(".content-name");
let oSubCart = d.querySelector(".classification-content");
window.onload = () => {
  // 获取全部分类列表
  getCartAll();
  // 二级菜单初始化
  getSunCartDefault();
  //   点击一级分类生成二级菜单
  clickOneCart();
  // 商品点击跳转
  oSubCart.addEventListener("click", (e) => {
    let cateId = e.target.closest("li").dataset.id;
    let cateLeavel = e.target.closest("li").dataset.pid;
    location.assign(
      `../views/searchresult.html?cate_id=${cateId}&cate_level=${cateLeavel}`
    );
  });
};
//   二级菜单默认渲染第一个
const getSunCartDefault = async () => {
  const res = await findCartGorySub(2);
  if (res.status) {
    let innerHTML = "";
    res.data.forEach((item) => {
      let html = `<li data-id=${item.id} data-pid=${item.pId}>
					<img class="content-photo" src=${item.img} alt="">
					<div class="content-name">${item.name}</div>
				</li>`;
      innerHTML += html;
    });
    //   渲染二级菜单
    oSubCart.innerHTML = innerHTML;
  }
};
//   点击一级分类生成二级菜单
const clickOneCart = () => {
  oOneCart.addEventListener("click", async (e) => {
    //   一级菜单的ID
    let pId = +e.target.id;
    // 渲染title
    let title = e.target.innerText;
    title = `——${title}分类——`;
    oTitle.innerHTML = title;
    // 渲染海报图片
    let img = e.target.dataset.img; //获取已定义属性
    oBigImg.src = img;

    const res = await findCartGorySub(pId);
    console.log(res);
    if (res.status) {
      let innerHTML = "";
      res.data.forEach((item) => {
        let html = `<li data-id=${item.id} data-pid=${item.pId}>
					<img class="content-photo" src=${item.img} alt="">
					<div class="content-name">${item.name}</div>
				</li>`;
        innerHTML += html;
      });
      //   渲染二级菜单
      oSubCart.innerHTML = innerHTML;
    }
  });
};
// 获取全部分类列表
const getCartAll = async () => {
  const res = await findCateGory();
  console.log(res);
  if (res.status) {
    const cartAll = res.data.filter((item) => {
      return item.pId === 1;
    });
    // 渲染一级分类
    let innerHTML = "";
    cartAll.forEach((item) => {
      // 自定义属性
      let html = `<li  data-img=${item.img} id="${item.id}">${item.name}</li>`;
      innerHTML += html;
    });
    oOneCart.innerHTML = innerHTML;
  }
};
