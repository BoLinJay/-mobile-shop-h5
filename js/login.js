import validation from "./validation.js";
let d = document;
let oUsername = d.querySelector(".account");
let oPassword = d.querySelector(".password");
let oSubmit = d.querySelector(".submit");
// 账号验证
oUsername.addEventListener("keyup", () => {
  validation(oUsername, "username");
});
// 密码验证
oPassword.addEventListener("keyup", () => {
  validation(oPassword, "password");
});
// 登录按钮
oSubmit.addEventListener("click", () => {
  //   表单验证
  validation(oUsername, "username");
  validation(oPassword, "password");
});
