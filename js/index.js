let d = document;
let myPage = d.querySelector("#mypage");
let myCart = d.querySelector("#mycart");
// 我的
myPage.addEventListener("click", () => {
  location.assign("../views/mypage.html");
});
// 购物车
myCart.addEventListener("click", () => {
  location.assign("../views/cart.html");
});
