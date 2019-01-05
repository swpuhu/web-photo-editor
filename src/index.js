import Canvas from './js/console/canvas.js';
import Menu from './js/console/menu.js';
import MenuBar from './js/console/menuBar.js';
// browser behavior reset
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
  return false;
})

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

const root = document.getElementById('root');
const canvas = Canvas();
const menuBar = MenuBar();
root.appendChild(menuBar.getElement());
/* let filePicker = document.createElement('input');
let canvas;
filePicker.type = 'file';
root.appendChild(filePicker);


filePicker.onchange = function (e) {
  canvas && canvas.remove()
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  if (/.jpg|png$/.test(file.name)) {
    let image = new Image();
    image.onload = function () {
      canvas = canvasFunc(image.naturalWidth, image.naturalHeight);
      canvas.drawImage(image);
      root.appendChild(canvas.getElement());
    }
    image.src = url;
  }
}

let menu = Menu([
  {
    title: 'level1',
    line: true,
    isAvaliable: function () {
      return true;
    },
    callback: function () {
      console.log('hello world');
    },
    children: [
      {
        title: 'level1-sub',
        line: true,
        isAvaliable: function () {
          return true;
        },
        callback: function () {
          console.log('level1-sub');
        }
      },
      {
        title: 'level2-sub',
        line: true,
        isAvaliable: function () {
          return false;
        },
        callback: function () {
          console.log('level2-sub');
        }
      }
    ]
  },
  {
    title: 'level2',
    line: true,
    isAvaliable: function () {
      return false;
    },
    callback:function () {
      console.log('level2');
    }
  },
  {
    title: 'level3',
    line: true,
    isAvaliable: function () {
      return true;
    },
    callback: function () {
      console.log('level3');
    },
    children: [
      {
        title: 'level3-sub1',
        lien: true,
        isAvaliable: function () {
          return true;
        },
        callback: function () {
          console.log('level3-sub1');
        }
      }
    ]
  }
]);

document.body.appendChild(menu.getElement()); */


window.app = {
  canvas: canvas
}