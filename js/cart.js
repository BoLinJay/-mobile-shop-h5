import {
  findCartList,
  CartDecrease,
  CartIncrease,
  orderSettle,
} from "../api/index.js";

let d = document;
let ischeckedAll = d.querySelector(".allcheck");
let lis = d.querySelectorAll(".cart li");
let oPirceSum = d.querySelector("#pirceSum");
let oGoBack = d.querySelector("#goBack");
let oCart = d.querySelector(".cart");
let oSubmit = d.querySelector("#submit");
// 总金额
let pirceSum = 0;
// 商品数量传后台参数
let params = {
  id: null,
  num: 1,
};
// 购买商品的id
let goods = [];
window.onload = () => {
  // 获取购物车列表
  getCartList();
  // 后退
  oGoBack.addEventListener("click", () => {
    history.go(-1);
  });
  ischeckedAll.checked = false; //全选按钮默认不选
  // 全选按钮
  ischeckedAll.addEventListener("click", () => {
    // 下单的商品
    let checkboxAll = d.querySelectorAll(".checkbox");
    checkboxAll.forEach((item) => {
      item.checked = ischeckedAll.checked;
      // 获取选中商品的id
      if (item.checked) {
        let id = item.closest("li").dataset.id;
        !goods.includes(id) && goods.push(id);
      } else {
        goods = [];
      }
    });
    console.log(goods);

    //   计算总金额
    pirceSum = componentPirceSum();
    //   渲染
    oPirceSum.innerText = pirceSum.toFixed(2);
  });
  // 事件委托商品逻辑
  oCart.addEventListener("click", (e) => {
    let id = e.target.id;
    // 选中的li 祖先元素
    let this_li = e.target.closest("li");
    // 选中的数量input
    let this_countNum = this_li.querySelector(".main");
    // 选中的价格
    let this_pirce = this_li.querySelector("#pirce");
    // 选中的单选框
    let this_checkbox = this_li.querySelector("#checkbox");
    // 商品id
    let this_id = this_li.dataset.id;
    // 后台参数
    params.id = +this_id;
    // input数量框
    if (id === "num") {
      // 判断是否选中
      if (this_checkbox.checked) {
        // input失去焦点
        this_countNum.addEventListener("blur", () => {
          pirceSum += this_countNum.value * this_pirce.innerText;
        });
      }
    }
    // 单选框
    if (id === "checkbox") {
      //  是否全选
      isAllChecked();
      //   计算总金额
      pirceSum = componentPirceSum();
    }
    // 删除
    if (id === "delete") {
      this_li.remove(this_li);
      // 重新获取lis
      lis = d.querySelectorAll(".cart li");
    }
    // 数量减
    if (id === "minus") {
      if (this_countNum.value > 1) {
        // this_countNum.value--;
        // params.num--;
        // 判断是否选中
        if (this_checkbox.checked) {
          //   总金额减-1
          pirceSum -= parseFloat(this_pirce.innerText);
        }
      }
      // 后端商品数量减少
      numReduce(params);
      // 更新DOOM
      // getCartList();
    }
    // 数量加
    if (id === "add") {
      // this_countNum.value++;
      // params.num++;
      // 判断是否选中
      if (this_checkbox.checked) {
        // 总金额+1
        pirceSum += parseFloat(this_pirce.innerText);
      }
      // 后端商品数量增加
      numIncrease(params);
      // 更新DOOM
      // getCartList();
    }
    //   渲染
    oPirceSum.innerText = pirceSum.toFixed(2);
  });
  // 下单
  oSubmit.addEventListener("click", () => {
    if (!goods.length) {
      alert("请选择商品");
      return;
    }
    location.assign(`../views/confirm_an_order.html?goods=${goods}`);
  });
};
const getCartList = async () => {
  // 获取购车列表
  const res = await findCartList();
  let innerHTMl = "";
  res.data.forEach((item) => {
    let html = `     <li data-id=${item.goods_id}>
                <img src="../images/icon/elf_17.png" alt="" class="delete" id="delete">
                <input type="checkbox" class="checkbox" id="checkbox">
                <img src=${item.img} alt="" class="cart_img">
                <div class="info">
                    <div class="text">
                        <div class="title">${item.name}</div>
                        <div class="size">${item.name}</div>
                    </div>
                    <div class="number">
                        <div class="money">￥<span id="pirce">${item.price}</span></div>
                        <div class="option">
                            <span class="minus" id="minus">-</span>
                            <input type="number" class="main" value=${item.goods_num} id="num">
                            <span class="add" id="add">+</span>
                        </div>
                    </div>
                </div>
            </li>`;
    innerHTMl += html;
  });
  oCart.innerHTML = innerHTMl;
};
// 数量减少接口
const numReduce = async (params) => {
  const res = await CartDecrease(params);
  if (res.status) {
    // 更新购物车列表
    getCartList();
  }
};
//数量增加接口
const numIncrease = async (params) => {
  const res = await CartIncrease(params);
  if (res.status) {
    // 更新购物车列表
    getCartList();
  }
};
// 计算总金额
const componentPirceSum = () => {
  let lis = d.querySelectorAll(".cart li");
  const arr = [];
  //   选出选中的商品
  lis.forEach((item) => {
    let isCheckedTrue = item.querySelector("#checkbox").checked;
    if (isCheckedTrue) {
      let item_pirce = item.querySelector("#pirce").innerText;
      let item_num = item.querySelector("#num").value;
      let count = item_pirce * item_num;
      //   单个商品的总金额添加至数组
      arr.push(count);
    }
  });
  //   数组累加，计算所有商品的总金额
  return arr.reduce((start, end) => start + end, 0);
};
// 是否全选
const isAllChecked = () => {
  // 下单的商品
  let checkboxAll = d.querySelectorAll(".checkbox");
  // nodelist转换数组
  let checkedArray = [];
  checkboxAll.forEach((item) => {
    checkedArray.push(item);
    // 获取选中商品的id
    if (item.checked) {
      let id = +item.closest("li").dataset.id;
      !goods.includes(id) && goods.push(id);
    } else {
      // 取消勾选
      let id = +item.closest("li").dataset.id;
      let index = goods.indexOf(id);
      index >= 0 && goods.splice(index, 1);
    }
  });
  console.log(goods);
  orderSettle(goods).then((res) => {
    // console.log(res);
  });
  // 是否全选
  let isCheckedAll = checkedArray.every((item) => {
    return item.checked === true;
  });
  ischeckedAll.checked = isCheckedAll;
};
// 获取goTop按钮
let goTopBtn = d.getElementById("goTop");
// 初始时，被浏览器卷进去的上部内容高度为 0
let scrollTop = 0;
// 监听页面滚动事件
window.onscroll = () => {
  // 获取被浏览器卷进去的上部内容高度
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 如果被卷进去的内容高度大于 50，显示返回顶部的按钮；
  // 如果被卷进去的内容高度小于 50，隐藏返回顶部的按钮。
  scrollTop > 50
    ? (goTopBtn.style.display = "block")
    : (goTopBtn.style.display = "none");
};
goTopBtn.onclick = () => {
  // 清空上一次的定时器
  let timer = null;
  //   防抖
  clearInterval(timer);
  // 创建定时器，每 15ms 执行一次箭头函数
  timer = setInterval(() => {
    // 每次执行函数，scrollTop 减少十分之一
    scrollTop -= scrollTop / 10;
    window.scrollTo(0, scrollTop);
    // 当 scrollTop 小于 2 时，直接使 scrollTop 为 0，并且清空定时器。
    if (scrollTop < 2) {
      window.scrollTo(0, 0);
      clearInterval(timer);
    }
  }, 15);
};
