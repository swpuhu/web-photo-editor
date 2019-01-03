import canvasFunc from './js/canvas.js';
const root = document.getElementById('root');
let canvas = canvasFunc();
root.appendChild(canvas.getElement());
console.dir(canvas);
let image = new Image();
image.onload = function () {
  canvas.drawImage(image);
}
image.src = './assets/icon.jpg';

