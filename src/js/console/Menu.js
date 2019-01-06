import * as util from '../util/util.js';
import base from '../util/base.js';

/**
 *
 * @param {Array<MenuItem>} menuList
 * @return {Menu}
 */
export default function (menuList) {
  let obj = Object.create(base);
  let doc = document.createElement('div');
  let subDoc;
  util.addClass(doc, ['menu']);
  for (let m of menuList) {
    let disabled;
    let item = document.createElement('div');
    util.addClass(item, [m.className ? m.className : 'menu-item']);
    if (m.line && menuList.indexOf(m) !== menuList.length - 1) {
      item.classList.add('line');
    }
    if (!m.isAvailable()) {
      disabled = true;
      item.classList.add('disabled');
    }

    item.addEventListener('click', function () {
      if (disabled) {
        return;
      }
      m.callback && m.callback();
      remove();
    });

    item.addEventListener('mouseover', function (e) {
      e.stopPropagation();
      if (subDoc) {
        subDoc.remove();
        subDoc = null;
      }
      if (disabled) {
        return;
      }
      item.classList.add('hover');
      // 添加子级菜单
      if (m.children) {
        subDoc = document.createElement('div');
        util.addClass(subDoc, ['sub-menu']);
        for (let c of m.children) {
          let _disabled;
          let _item = document.createElement('div');
          util.addClass(_item, ['sub-menu__item']);
          if (c.line && m.children.indexOf(c) !== m.children.length - 1) {
            _item.classList.add('line');
          }
          _item.innerText = c.title;
          _item.title = c.title;
          if (c.line) {
            util.addClass(_item, [c.className ? c.className : 'sub-item']);
          }
          if (!c.isAvailable()) {
            _disabled = true;
            _item.classList.add('disabled');
          }
          _item.addEventListener('click', function () {
            if (_disabled) {
              return;
            }
            c.callback && c.callback();
            remove();
          });
          _item.addEventListener('mouseover', function (e) {
            e.stopPropagation();
            if (_disabled) {
              return ;
            }
            _item.classList.add('hover');
          });
          _item.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            _item.classList.remove('hover');
          });
          subDoc.appendChild(_item);
        }
        document.body.appendChild(subDoc);
        let itemCoordinate = item.getBoundingClientRect();
        subDoc.style.left = itemCoordinate.left + itemCoordinate.width + 2 + 'px';
        subDoc.style.top = itemCoordinate.top + 'px';

      }
    });

    let clearSubMenu = function () {
      item.classList.remove('hover');
    };

    item.addEventListener('mouseleave', clearSubMenu);
    document.addEventListener('mouseover', function () {
      if (subDoc) {
        subDoc.remove();
        subDoc = null;
      }
    });
    item.innerText = m.title;
    item.title = m.title;
    doc.appendChild(item);
  }


  function getElement() {
    return doc;
  }

  function remove() {
    doc.remove();
    subDoc && subDoc.remove();
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
