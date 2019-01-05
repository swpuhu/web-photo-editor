declare namespace SubMenu {
  function isAvaliable () : boolean;
  function isHighlight () : boolean;
  function callback () : any;
  let title: string;
  let className: string;
  let line: boolean;
}

interface SubMenu {
  isAvaliable (): boolean;
  isHighlight(): boolean;
  callback(): any;
  title: string;
  className: string;
  line: boolean;
  test: any;
}

declare namespace MenuItem {
  function isAvaliable ():boolean;
  function isHighlight ():boolean;
  function callback (): any;
  let title: string;
  let className: string;
  let children: Array<SubMenu>;
  let line:boolean;
}

declare namespace MyCanvas {
  function getElement () : HTMLElement;
  function remove(): void;
  function drawImage(img: HTMLElement, sx: number, sy: number, dWidth: number, dHeight: number): void;
  let canvas: HTMLCanvasElement;
}
