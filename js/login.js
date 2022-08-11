import validation from "../until/validation.js";
import { login } from "../api/index.js";
let d = document;
let oUsername = d.querySelector(".account");
let oPassword = d.querySelector(".password");
let oSubmit = d.querySelector(".submit");
let username = oUsername.value,
  password = oPassword.value;
// 账号验证
oUsername.addEventListener("keyup", () => {
  oUsername.isValid = validation(oUsername, "username");
});
// 密码验证
oPassword.addEventListener("keyup", () => {
  oPassword.isValid = validation(oPassword, "password");
});
// 登录按钮

oSubmit.addEventListener("click", () => {
  //   表单验证
  let allValid = true;
  allValid = oUsername.isValid && oPassword.isValid;
  if (!allValid) {
    alert("账号密码格式不正确");
    return;
  }
  login({ username, password }).then((res) => {
    location.assign("../views/searchresult.html");
  });
});
