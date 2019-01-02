const VERTEX_SHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  void main () {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }
`;

const FRAG_SHADER_SOURCE = `
  precision mediump float;
  uniform sampler2D u_Sampler;
  varying vec2 v_TexCoord;
  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }
`

export {VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE};