
export class ImageInfo {
  element;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  outside: string; // 'mac'|'iPhone'|'xps'|'shadow'|'none'
  constructor (element, width, height, x, y, zIndex) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.zIndex = zIndex;
    this.outside = 'none';
  }
}
