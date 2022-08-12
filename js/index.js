let d = document;
let myPage = d.querySelector("#mypage");
// 我的
myPage.addEventListener("click", () => {
  location.assign("../views/mypage.html");
});
