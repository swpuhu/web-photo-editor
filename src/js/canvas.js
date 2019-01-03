import * as util from './util/util.js';
import initGL from './gl/initGL.js';
import {VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE} from './gl/GLSL.js';

/**
 * @returns {Object}
 */
export default function (width, height) {
  let doc = document.createElement('div');
  let obj = {};
  util.addClass(doc, ['canvas-div']);
  let canvas = document.createElement('canvas');
  util.appendChildren(doc, canvas);
  let gl = canvas.getContext('webgl');
  gl = initGL(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE);
  initCanvas();

  function initCanvas() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(gl.program);
  }

  /**
   *
   * @param {HTMLImageElement} img
   * @param {number} sx
   * @param {number} sy
   * @param {number} dWidth
   * @param {number} dHeight
   */
  function drawImage(img, sx = 0, sy = 0, dWidth , dHeight) {
    let width;
    let height;
    console.log(Object.prototype.toString.call(img))
    if (Object.prototype.toString.call(img) === '[object HTMLImageElement]') {
      width = dWidth = img.naturalWidth;
      height = dHeight = img.naturalHeight;
    } else {
      width = dWidth = canvas.width;
      height = dHeight = canvas.height;
    }

    let vertices = new Float32Array([
      -1.0, 1.0, sx / width, 1.0 - sy / height,
      -1.0, -1.0, sx / width, 1.0 - (sy + dHeight) / height,
      1.0, 1.0, (sx + dWidth) / width, 1.0 - sy / height,
      1.0, -1.0, (sx + dWidth) / width, 1.0 - (sy + dHeight) / height,
    ]);
    let n = initVertexBuffer(gl, vertices);
    let texture = gl.createTexture();
    let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    loadTexture(gl, n, texture, u_Sampler, img);
  }
  /**
   *
   * @param {WebGLRenderingContext} gl
   */
  function initVertexBuffer(gl, vertices) {
    let verticesTexCoords = vertices;
    let n = 4;
    let vertexTexCoordBuffer = gl.createBuffer(); // create buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  verticesTexCoords, gl.STATIC_DRAW);
    let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    let a_Postion = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(gl.program, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Postion);

    let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);
    return n;
  }
  /**
   *
   * @param {WebGLRenderingContext} gl
   * @param {Number} n
   */
  function initTexture(gl, n, src, type) {
    let texture = gl.createTexture();
    let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if (type === 'image') {
      var image = new Image();
      image.onload = function () {
        loadTexture(gl, n, texture, u_Sampler, image);
      }
      image.src = src;
      return true;
    } else if (type === 'video') {
      var video = document.createElement('video');
      // console.log(Object.prototype.toString.call(video));
      video.oncanplaythrough = function () {
        loadTexture(gl, n, texture, u_Sampler, video);
      }
      video.src = src;
      return true;
    } else {
      throw new Error('please input correct type, type equal "video" or "image"');
    }
  }

  /**
   *
   * @param {WebGLRenderingContext} gl
   * @param {Number} n
   * @param {WebGLTexture} texture
   * @param {WebGLUniformLocation} u_Sampler
   * @param {*} image
   */
  function loadTexture(gl, n, texture, u_Sampler, media) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // reverse texture image in y axis
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);
    gl.uniform1i(u_Sampler, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function getElement() {
    return doc;
  }
  Object.defineProperties(obj, {
    getElement: {
      value: getElement,
      writable: false,
      configurable: false,
      enumerable: true
    },
    drawImage: {
      value: drawImage,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
  return obj;
}