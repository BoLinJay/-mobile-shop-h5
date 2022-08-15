let d = document;
let oMyPage = d.querySelector("#mypage");
let oMyCart = d.querySelector("#mycart");
let oCartgory = d.querySelector("#cartgory");
// 我的
oMyPage.addEventListener("click", () => {
  location.assign("../views/mypage.html");
});
// 购物车
oMyCart.addEventListener("click", () => {
  location.assign("../views/cart.html");
});
// 分类
oCartgory.addEventListener("click", () => {
  location.assign("../views/classification.html");
});
