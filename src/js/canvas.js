import * as util from './util/util.js';
import initGL from './gl/initGL.js';
import {VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE} from './gl/GLSL.js';

/**
 * @returns {Object}
 */
export default function () {
  let doc = document.createElement('div');
  let obj = {};
  util.addClass(doc, ['canvas-div']);
  let canvas = document.createElement('canvas');
  util.appendChildren(doc, canvas);

  let gl = canvas.getContext('webgl');
  gl = initGL(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE);
  draw();
  function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(gl.program);
    gl.drawArrays(gl.POINTS, 0, 1);
  }

  function getElement() {
    return doc;
  }
  Object.defineProperties(obj, {
    getElement: {
      value: getElement
    }
  });
  return obj;
}