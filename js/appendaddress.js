import {
  findCity,
  findCounty,
  findDart,
  findTown,
  addAddress,
} from "../api/index.js";
import { throttle } from "../utils/lodash.js";
import validation from "../utils/validation.js";
let d = document;
let dart = d.querySelector("#dart");
let city = d.querySelector("#city");
let county = d.querySelector("#county");
let town = d.querySelector("#town");
let name = d.querySelector("#name");
let tel = d.querySelector("#tel");
let street = d.querySelector("#street");
let code = d.querySelector("#code");
let isCheckbox = d.querySelector("#checkbox");
let submitButton = d.querySelector(".submit");
// 表单信息
let addressInfo = {
  name: "",
  tel: "",
  province_id: "",
  city_id: "",
  county_id: "",
  town_id: "",
  street: "",
  code: "",
  isDefault: "1",
};
// 加载完毕
window.onload = () => {
  //地址
  findAddress();
  //表单信息
  getFormData();
};
// 省
const findAddress = async () => {
  const result = await findDart();
  let html = "";
  result.status &&
    result.data.forEach((item) => {
      html += `<option value=${item.province_id}>${item.name}</option>`;
    });
  dart.innerHTML = html;
  //   市
  dart.addEventListener("change", async function () {
    let dartId = this.value;
    // 收集省id
    addressInfo.province_id = +dartId;
    const result = await findCity({ id: dartId });
    let html = "";
    result.status &&
      result.data.forEach((item) => {
        html += `<option value=${item.city_id}>${item.name}</option>`;
      });
    city.innerHTML = html;
  });
  //   区
  city.addEventListener("change", async function () {
    let cityId = this.value;
    // 收集市id
    addressInfo.city_id = +cityId;
    const result = await findCounty({ id: cityId });
    let html = "";
    result.status &&
      result.data.forEach((item) => {
        html += `<option value=${item.county_id}>${item.name}</option>`;
      });
    county.innerHTML = html;
  });
  //   街道
  county.addEventListener("change", async function () {
    let countyId = this.value;
    // 收集区id
    addressInfo.county_id = +countyId;
    const result = await findTown({ id: countyId });
    let html = "";
    result.status &&
      result.data.forEach((item) => {
        html += `<option value=${item.town_id}>${item.name}</option>`;
      });
    town.innerHTML = html;
  });
  //收集街道id
  town.addEventListener("change", (e) => {
    addressInfo.town_id = +e.target.value;
  });
};
// 表单信息
const getFormData = () => {
  //防抖处理
  const setName = throttle((e) => {
    addressInfo.name = e.target.value;
  });
  const setTel = throttle((e) => {
    addressInfo.tel = e.target.value;
  });
  const setstreet = throttle((e) => {
    addressInfo.street = e.target.value;
  });
  const setCode = throttle((e) => {
    addressInfo.code = e.target.value;
  });
  // 姓名
  name.addEventListener("keyup", (e) => {
    setName(e);
  });
  //  手机号
  tel.addEventListener("keyup", (e) => {
    tel.idchange = validation(tel, "phone");
    setTel(e);
  });
  //   详细地址
  street.addEventListener("keyup", (e) => {
    setstreet(e);
  });
  //   邮政编码
  code.addEventListener("click", (e) => {
    setCode(e);
  });
  // 是否默认
  isCheckbox.addEventListener("change", (e) => {
    addressInfo.isDefault = e.target.checked ? 1 : 0;
  });
  //   submit
  submitButton.addEventListener("click", async () => {
    const result = await addAddress(addressInfo);
    result.status && alert("添加成功");
  });
};
