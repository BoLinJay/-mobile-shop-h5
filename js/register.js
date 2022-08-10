import validation from "./validation.js";
let d = document;
let userName = d.querySelector(".formData_account");
let password = d.querySelector(".formData_password");
let passwordRepeat = d.querySelector(".formData_repeat");
let phone = d.querySelector(".formData_phone_input");
let submit = d.querySelector(".formData_submit");
// 账号验证
userName.addEventListener("keyup", () => {
  validation(userName, "username");
});
// 密码验证
password.addEventListener("keyup", () => {
  validation(password, "password");
});
// 确认密码
passwordRepeat.addEventListener("keyup", () => {
  validation(passwordRepeat, "repeat");
});
// 手机号
phone.addEventListener("keyup", () => {
  validation(phone, "phone");
});
// 注册按钮
submit.addEventListener("click", () => {
  console.log(sub);
});
