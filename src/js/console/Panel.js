import * as util from '../util/util.js';
import base from '../util/base.js';
import MenuBar from './MenuBar.js';
import Canvas from './canvas.js';
import Size from '../Enum/Size.js';
/**
 *
 * @return {Panel}
 */
export default function () {
  const obj = Object.create(base);
  const doc = document.createElement('div');
  let canvas = Canvas();
  let zoom = 1;
  let isFirst = true;
  util.addClass(doc, ['panel']);

  const menuBarArea = document.createElement('div');
  util.addClass(menuBarArea, ['panel-menuBarArea']);
  menuBarArea.appendChild(MenuBar().getElement());
  menuBarArea.style.cssText = `height: ${Size.menuBarAreaHeight}px`;

  const toolBoxArea = document.createElement('div');
  util.addClass(toolBoxArea, ['panel-toolBoxArea']);
  toolBoxArea.style.cssText = `width: ${Size.toolBoxAreaWidth}px`;

  const editArea = document.createElement('div');
  util.addClass(editArea, ['panel-editArea']);
  editArea.style.cssText = `left: ${Size.toolBoxAreaWidth}px; right: ${Size.infoAreaWidth}px`;
  editArea.addEventListener('mousewheel', function (e) {
    if (window.app.canvas && e.altKey) {
      e.preventDefault();
      let _zoom = window.app.zoom;
      if (e.deltaY < 0) {
        // 向上滚动 放大图片
        _zoom *= 1.1;
      } else if (e.deltaY > 0) {
        // 向下滚动 缩小图片
        _zoom /= 1.1;
        if (_zoom < 0) {
          _zoom += 0.1;
        }
      }
      window.app.zoom = _zoom;
    }
  });

  const infoArea = document.createElement('div');
  util.addClass(infoArea, ['panel-infoArea']);
  infoArea.style.cssText = `width: ${Size.infoAreaWidth}px`;

  util.appendChildren(doc, menuBarArea, toolBoxArea, editArea, infoArea);

  const resize = function () {
    if (window.app.canvas) {
      let left = (editArea.clientWidth - canvas.getElement().clientWidth) / 2;
      if (left < 0) {
        left = 0;
      }
      let top = (editArea.clientHeight - canvas.getElement().clientHeight) / 2;
      if (top < 0) {
        top = 0;
      }
      window.app.canvas.getElement().style.left = left + 'px';
      window.app.canvas.getElement().style.top = top + 'px';
    }
  };

  window.addEventListener('resize', resize);
  function getElement() {
    return doc;
  }

  function remove() {
    doc.remove();
  }
  obj.addEventListener('reset', function () {
    zoom = 1;
    isFirst = true;
    window.app.canvas && window.app.canvas.remove();
  });

  Object.defineProperties(obj, {
    menuBarArea: {
      value: menuBarArea,
      writable: false,
      configurable: false,
      enumerable: true
    },
    toolBoxArea: {
      value: toolBoxArea,
      writable: false,
      configurable: false,
      enumerable: true
    },
    editArea: {
      value: editArea,
      writable: false,
      configurable: false,
      enumerable: true
    },
    infoArea: {
      value: infoArea,
      writable: false,
      configurable: false,
      enumerable: true
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
    },
    canvas: {
      get() {
        return canvas;
      },
      set (value) {
        canvas = value;
      }
    },
    zoom: {
      get () {
        return zoom;
      },
      set (value) {
        if (window.app.canvas && !isFirst) {
          let canvasEle = window.app.canvas.canvas;
          canvasEle.style.width = canvasEle.clientWidth * (value / zoom) + 'px';
          canvasEle.style.height = canvasEle.clientHeight * (value / zoom) + 'px';
          resize();
        }
        isFirst = false;
        zoom = value;
      }
    }
  });
  return window.app = obj;
}
