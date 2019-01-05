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
  doc.addEventListener('click', function (e) {
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
      set (value) {
        if (typeof value === 'function') {
          onClick = value;
        } else {
          throw new Error('请传入函数');
        }
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
function FileButton () {
  let fileButton = Template('FileButton');
  let doc = fileButton.getElement();
  let obj = Object.create(base);
  fileButton.onClick = function (e) {
    // TODO: 需要保证Menu是单例的。
    import('./menu.js').then((data) => {
      let Menu = data.default;
      let menu = Menu([
        {
          title: '打开文件',
          isAvaliable: function () {
            return true;
          },
          line: true,
          callback: function () {
            let input = document.createElement('input');
            input.type = 'file';
            input.click();
            function change (e) {
              let file = e.target.files[0];
              console.log(file.name);
              if (/.png|jpg|jpeg/i.test(file.name)) {
                window.app.canvas && window.app.canvas.remove();
                let url = URL.createObjectURL(file);
                let image = new Image();
                image.onload = function () {
                  let canvas = Canvas(image.naturalWidth, image.naturalHeight);
                  window.app.canvas = canvas;
                  document.body.appendChild(canvas.getElement());
                  canvas.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
                }
                image.src = url;

              } else {
                alert('请选择图片文件！');
              }
            }
            input.addEventListener('change', change)
          }
        }
      ]);
      document.body.appendChild(menu.getElement());
      let menuELement = menu.getElement();
      menuELement.style.left = doc.getBoundingClientRect().left + 'px';
      menuELement.style.top = doc.getBoundingClientRect().top + doc.getBoundingClientRect().height + 'px';
    });
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