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
  // console.log(login({ username, password }));
  login({ username, password }).then((res) => {
    console.log(res);
    // location.assign("../index.html");
  });
});
