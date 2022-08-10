let repeatValue = "",
  passwordValue = "";
// 表单验证函数
export default function validation(target, methods) {
  if (arguments.length !== 2) {
    throw new Error("希望传入两个值:验证对象和验证方法");
  }
  target.style.borderColor = "green";
  // 账号
  if (methods === "username") {
    let userNameValid = /\w{3,}/.test(target.value);
    if (!userNameValid) {
      target.style.borderColor = "red";
    }
  }
  // 密码
  if (methods === "password") {
    let passwordValid = /\d{3,}/.test(target.value);
    if (!passwordValid) {
      target.style.borderColor = "red";
    }
    passwordValue = target.value;
  }
  // 重复密码
  if (methods === "repeat") {
    repeatValue = target.value;
    if (repeatValue !== passwordValue) {
      target.style.borderColor = "red";
    }
  }
  // 手机号
  if (methods === "phone") {
    let phoneValid = /(13|14|15|17|18|19)[0-9]{9}/.test(target.value);
    if (!phoneValid) {
      target.style.borderColor = "red";
    }
  }
}
