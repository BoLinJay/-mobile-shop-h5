// 防抖函数
export function debounce(fn, delay = 500) {
  let timer = null;
  return function () {
    // 立即执行一次
    if (!timer) {
      fn.apply(this.arguments);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this.arguments);
      timer = null;
    }, delay);
  };
}
// 节流函数
export function throttle(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
