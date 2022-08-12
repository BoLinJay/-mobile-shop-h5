let d = document;
let checkboxAll = d.querySelectorAll(".checkbox");
let ischeckedAll = d.querySelector(".allcheck");
let lis = d.querySelectorAll(".cart li");
let oPirceSum = d.querySelector("#pirceSum");
let oGoBack = d.querySelector("#goBack");
// 总金额
let pirceSum = 0;
window.onload = () => {
  // 后退
  oGoBack.addEventListener("click", () => {
    history.go(-1);
  });
  // 全选按钮
  ischeckedAll.addEventListener("click", () => {
    checkboxAll.forEach((item) => {
      item.checked = ischeckedAll.checked;
    });
    //   计算总金额
    pirceSum = componentPirceSum();
    //   渲染
    oPirceSum.innerText = pirceSum.toFixed(2);
  });
  // 事件委托
  lis.forEach((item) => {
    item.addEventListener("click", function (e) {
      let id = e.target.id;
      // 当前数量input
      let this_countNum = this.querySelector(".main");
      // 当前价格
      let this_pirce = this.querySelector("#pirce");
      // 当前单选框
      let this_checkbox = this.querySelector("#checkbox");
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
        this.remove(this);
        // 重新获取lis
        lis = d.querySelectorAll(".cart li");
      }
      // 数量减
      if (id === "minus") {
        if (this_countNum.value > 1) {
          this_countNum.value--;
          // 判断是否选中
          if (this_checkbox.checked) {
            //   总金额减-1
            pirceSum -= parseFloat(this_pirce.innerText);
          }
        }
      }
      // 数量加
      if (id === "add") {
        this_countNum.value++;
        // 判断是否选中
        if (this_checkbox.checked) {
          // 总金额+1
          pirceSum += parseFloat(this_pirce.innerText);
        }
      }
      //   渲染
      oPirceSum.innerText = pirceSum.toFixed(2);
    });
  });
};

// 计算总金额
const componentPirceSum = () => {
  const arr = [];
  //   选出选中的商品
  lis.forEach((item) => {
    let isChecked = item.querySelector("#checkbox").checked;
    if (isChecked) {
      let item_pirce = item.querySelector("#pirce").innerText;
      let item_num = item.querySelector("#num").value;
      let count = item_pirce * item_num;
      //   单个商品的总金额添加至数组
      arr.push(count);
    }
  });
  //   数组累加
  return arr.reduce((start, end) => {
    return start + end;
  }, 0);
};
// 是否全选
const isAllChecked = () => {
  // nodelist转换数组
  let checkedArray = [];
  checkboxAll.forEach((item) => {
    checkedArray.push(item);
  });
  // 是否全选
  let isCheckedAll = checkedArray.every((item) => {
    return item.checked === true;
  });
  ischeckedAll.checked = isCheckedAll;
};

// 获取按钮
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
