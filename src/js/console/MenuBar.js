import * as util from '../util/util.js';
import base from '../util/base.js';
import Menu from './menu.js';
import Canvas from './canvas.js';
/**
 *
 * @param {string} name
 * @return {MenuButton}
 */
function Template(name) {
  let obj = Object.create(base);
  let onClick;
  let doc = document.createElement('div');
  util.addClass(doc, [name, 'menubar-item']);
  doc.innerText = name;
  let isClick = false;
  doc.addEventListener('click', function (e) {
    if (isClick) {
      return ;
    }
    isClick = true;
    e.stopPropagation();
    onClick && onClick.apply(this, arguments);
  });

  function getElement() {
    return doc;
  }

  function remove() {
    doc.remove();
  }

  Object.defineProperties(obj, {
    onClick: {
      get() {
        return onClick;
      },
      set(value) {
        if (typeof value === 'function') {
          onClick = value;
        } else {
          throw new Error('请传入函数');
        }
      }
    },
    isClick: {
      get () {
        return isClick;
      },
      set (value) {
        isClick = value;
      }
    },
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

/**
 * @return {MenuButton}
 */
function FileButton() {
  let fileButton = Template('FileButton');
  let doc = fileButton.getElement();
  let obj = Object.create(base);
  let createMenu = Menu;
  fileButton.onClick = function (e) {
    let menu = createMenu([
      {
        title: '打开文件',
        isAvailable: function () {
          return true;
        },
        line: true,
        callback: function () {
          fileButton.isClick = false;
          let input = document.createElement('input');
          input.type = 'file';
          input.click();

          function change(e) {
            let file = e.target.files[0];
            console.log(file.name);
            if (/.png|jpg|jpeg/i.test(file.name)) {
              window.app.dispatchEvent('reset');
              let url = URL.createObjectURL(file);
              let image = new Image();
              image.crossOrigin = 'Anonymous';
              image.onload = function () {
                let canvas = Canvas(image.naturalWidth, image.naturalHeight);
                window.app.canvas = canvas;
                window.app.editArea.appendChild(canvas.getElement());
                canvas.getElement().style.left = (window.app.editArea.clientWidth - canvas.getElement().clientWidth) / 2 + 'px';
                canvas.getElement().style.top = (window.app.editArea.clientHeight - canvas.getElement().clientHeight) / 2 + 'px';
                canvas.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
                window.app.zoom = +(canvas.canvas.clientHeight / image.naturalHeight).toFixed(2);
              };
              image.src = url;

            } else {
              alert('请选择图片文件！');
            }
          }
          input.addEventListener('change', change);
        }
      },
      {
        title: '保存图片',
        line: true,
        isAvailable: () => !!document.body.querySelector('.canvas-div'),
        callback: function () {
          fileButton.isClick = false;
          let url = window.app.canvas.canvas.toDataURL();
          util.downloadFile('test3', window.app.canvas.canvas.toDataURL("image/png"));
        }
      }
    ]);
    document.body.appendChild(menu.getElement());
    let menuElement = menu.getElement();
    menuElement.style.left = doc.getBoundingClientRect().left + 'px';
    menuElement.style.top = window.app.menuBarArea.getBoundingClientRect().top + window.app.menuBarArea.getBoundingClientRect().height + 1 + 'px';

  };


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

export default function () {
  let obj = Object.create(base);
  let doc = document.createElement('div');
  util.addClass(doc, ['menubar']);
  let fileButton = FileButton();
  doc.appendChild(fileButton.getElement());


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
