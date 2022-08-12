import { login, register } from "../api/index.js";
import validation from "../utils/validation.js";
let d = document;
let userName = d.querySelector(".formData_account");
let passWord = d.querySelector(".formData_password");
let passwordRepeat = d.querySelector(".formData_repeat");
let sex = d.querySelector(".formData_gender");
let phone = d.querySelector(".formData_phone_input");
let submit = d.querySelector(".formData_submit");
// 表单信息
let formData = {
  username: "",
  password: "",
  sex: "",
  tel: "",
};
// 登录用的表单信息
let loginFormData = {
  username: "",
  password: "",
};
// 账号验证
userName.addEventListener("keyup", () => {
  userName.isUsername = validation(userName, "username");
  formData.username = userName.value;
  loginFormData.username = userName.value;
});
// 密码验证
passWord.addEventListener("keyup", () => {
  passWord.isPassword = validation(passWord, "password");
  formData.password = passWord.value;
  loginFormData.password = passWord.value;
});
// 确认密码
passwordRepeat.addEventListener("keyup", () => {
  passwordRepeat.isRepeat = validation(passwordRepeat, "repeat");
});
// 手机号
phone.addEventListener("keyup", () => {
  // phone.isPhone = validation(phone, "phone");
  formData.tel = phone.value;
});
// 性别
sex.addEventListener("click", (e) => {
  let sexArr = d.getElementsByName("sex");
  for (let i = 0; i < sexArr.length; i++) {
    if (sexArr[i].checked) {
      formData.sex = sexArr[i].value;
    }
  }
});
// 注册按钮
submit.addEventListener("click", async () => {
  // 判断表单验证
  let isAll =
    userName.isUsername &&
    passWord.isPassword &&
    passwordRepeat.isRepeat &&
    phone.isPhone;
  // if (!isAll) {
  //   alert("格式不正确");
  //   return;
  // }
  // 注册API
  // register(formData).then((res) => {
  //   alert("恭喜您,成为尊贵的梅德赛斯会员");
  // });
  try {
    const result = await register(formData);
    if (!result.data) {
      alert("该车主账号已存在");
      return;
    }
    location.assign("../views/searchresult.html");
  } catch (error) {
    throw new Error(error);
  }
});
