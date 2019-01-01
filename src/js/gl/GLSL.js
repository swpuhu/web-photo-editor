const VERTEX_SHADER_SOURCE = `
  void main () {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`;

const FRAG_SHADER_SOURCE = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
`

export {VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE};