/**
 *
 * @param {Object} arr
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 *
 * @param {Object} arr
 */
function isObject(arr) {
  return Object.prototype.toString.call(arr) === '[object Object]';
}
/**
 *
 * @param {Object} arr
 */
function isFunction(arr) {
  return Object.prototype.toString.call(arr) === '[object Function]';
}
/**
 *
 * @param {Object} arr
 */
function isString(arr) {
  return Object.prototype.toString.call(arr) === '[object String]';
}

/**
 *
 * @param {HTMLElement} ele
 * @param {*} className
 */

function addClass (ele, className) {
  if (isArray(className) || isString(className)) {
    if (isArray(className)) {
      for (let i of className) {
        ele.classList.add(i);
      }
    } else {
      ele.classList.add(className);
    }
    return true;
  } else {
    throw new Error('className error!');
  }
}

function createElement(tagName, className) {
  let ele = document.createElement(tagName);
  className && addClass(ele, className);
  return ele;
}

function appendChildren(father, ...children) {
  children.forEach(item => {
    if (!item) {
      return;
    }
    father.appendChild(item);
  });
}

function getParams(string) {
  let s = string.replace(/\?/, '');
  let arr;
  let res = {};
  try {
    arr = s.split('&');
    for (let i of arr) {
      let sub = i.split('=');
      res[sub[0]] = sub[1];
    }
  } catch (e) {
    console.error(e);
  }
  return res;
}

function getHash(url) {
  return url.replace(/\?.*#/, '');
}

function throttle(fn, delay = 300) {
  let first = true;
  let self = this;
  let timer = null;
  return function () {
    if (first) {
      first = false;
      fn.apply(self, arguments);
    }
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(self, arguments);
      clearTimeout(timer);
      timer = null;
    }, delay);
  }
}

const CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const unit1 = ['十', '百', '千', '万'];
function numberToCN(n) {
  if (typeof n === 'number') {
    n = n.toString();
  }
  if (typeof n !== 'string') {
    throw new Error('type error');
  }
  if (n.length > 5) {
    throw new Error('beyond max length');
  }

  let number = n.split('');
  let res = [];
  for (let i = number.length - 1; i >= 0; --i) {
    let item = number[i];
    let prevItem = number[i - 1];
    res.unshift(CN[item]);
    if (prevItem) {
      res.unshift(unit1[number.length - i -1]);
    }
  }
  if (res.length === 3 && res[0] === '一') {
    res.shift();
  }
  return res.join('');
}

function getSingle(fn) {
  let ret;
  return function () {
    if (ret) {
      return ret;
    } else {
      return ret = fn.apply(this, arguments);
    }
  }
}

function base64Img2Blob(code){
  const parts = code.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

function downloadFile(fileName, content){

  var aLink = document.createElement('a');
  var blob = base64Img2Blob(content); //new Blob([content]);

  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  aLink.click();
}
export {
  isArray, isObject, isFunction, isString, addClass, appendChildren,
  getParams, getHash, throttle, createElement, numberToCN, getSingle,
  downloadFile, base64Img2Blob};
