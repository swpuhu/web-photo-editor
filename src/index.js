import canvasFunc from './js/canvas.js';
import Menu from './js/console/menu.js';
const root = document.getElementById('root');
let filePicker = document.createElement('input');
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
    }
  }
]);

document.body.appendChild(menu.getElement());