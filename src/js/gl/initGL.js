/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {*} type
 * @param {*} source
 */
function createShader(gl, type, source) {
  let shader = gl.createShader(type); // create shader object
  gl.shaderSource(shader, source); // provide data source
  gl.compileShader(shader); // compile -> generate shader
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  cosnole.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragShader
 */
function createProgram(gl, vertexShader, fragShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader); //attach vertexShader to program
  gl.attachShader(program, fragShader); // attach fragShader to program
  gl.linkProgram(program); // link Program
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return gl.program = program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} VERTEX_SHADER_SOURCE
 * @param {string} FRAG_SHADER_SOURCE
 */
function initGL(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE) {
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  let fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER_SOURCE);
  gl.program = createProgram(gl, vertexShader, fragShader);
  return gl;
}

export default initGL;