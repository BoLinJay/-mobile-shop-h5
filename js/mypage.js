let d = document;
let via = d.querySelector("#via");
let name = d.querySelector("#name");
let address = d.querySelector("#address");
// 收货地址
address.addEventListener("click", () => {
  location.assign("../views/address.html");
});
