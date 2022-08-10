let d = document;
let oUsername = d.querySelector(".account");
let oPassword = d.querySelector(".password");
let oSubmit = d.querySelector(".submit");
// 表单验证函数
function validation(target, methods) {
  if (arguments.length !== 2) {
    throw new Error("希望传入两个值:验证对象和验证方法");
  }
  target.style.borderColor = "green";
  // 账号
  if (methods === "username") {
    let userNameValid = /\w{3,}/.test(target.value);
    if (!userNameValid) {
      oUsername.style.borderColor = "red";
    }
  }
  // 密码
  if (methods === "password") {
    let passwordValid = /\d{3,}/.test(target.value);
    if (!passwordValid) {
      oPassword.style.borderColor = "red";
    }
  }
}
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
  // 是否为空
  if (!(oUsername.value || oPassword.value)) {
    alert("请先输入账号密码亲！");
  }
  //   表单验证
  validation(oUsername, "username");
  validation(oPassword, "password");
});
