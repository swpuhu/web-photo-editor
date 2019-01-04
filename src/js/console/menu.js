import * as util from '../util/util.js';
import base from '../util/base.js';

/**
 *
 * @param {Array<MenuItem>} menuList
 */
export default function (menuList) {
  let obj = Object.create(base);
  let doc = document.createElement('div');
  let subDoc;
  util.addClass(doc, ['menu']);
  for (let m of menuList) {
    let item = document.createElement('div');
    util.addClass(item, [m.className ? m.className : 'menu-item']);
    if (m.line) {
      item.classList.add('line');
    }
    if (!m.isAvaliable()) {
      item.classList.add('disabled');
    }
    item.addEventListener('click', function (e) {
      if (!m.isAvaliable()) {
        return;
      }
      m.callback && m.callback();
    });
    if (m.children) {
      item.addEventListener('mouseenter`', function (e) {
        subDoc = document.createElement('div');
        for (let c of m.children) {
          util.addClass(item, [])
          if (c.line) {
            let item = document.createElement('div');
            util.addClass(item, [c.className ? c.className : 'sub-item']);
          }
          if (!c.isAvaliable) {
            item.classList.add('disabled');
          }
          item.addEventListener('click', function (e) {
            if (!c.isAvaliable) {
              return ;
            }
            c.callback && c.callback();
          });
          subDoc.appendChild(item);
        }
        document.body.appendChild(subDoc);
      });
      item.addEventListener('mouseleave', function (e) {
        subDoc.remove();
      });
    }
    item.innerText = m.title;
    item.title = m.title;
    doc.appendChild(item);
  }

  function getElement() {
    return doc;
  }

  function remove() {
    doc.remove();
  }

  Object.defineProperties(obj, {
    getElement: {
      value: getElement,
      writable: false,
      configurable: false,
      enumerable: true
    },
    remove: {
      value: remove,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
  return obj;
}