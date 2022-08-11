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
    return userNameValid;
  }
  // 密码
  if (methods === "password") {
    let passwordValid = /\d{3,}/.test(target.value);
    if (!passwordValid) {
      target.style.borderColor = "red";
    }
    passwordValue = target.value;
    return passwordValid;
  }
  // 确认密码
  if (methods === "repeat") {
    repeatValue = target.value;
    let repeatValid = repeatValue === passwordValue;
    if (!repeatValid) {
      target.style.borderColor = "red";
    }
    return repeatValid;
  }
  // 手机号
  if (methods === "phone") {
    let phoneValid = /(13|14|15|17|18|19)[0-9]{9}/.test(target.value);
    if (!phoneValid) {
      target.style.borderColor = "red";
    }
    return phoneValid;
  }
}
