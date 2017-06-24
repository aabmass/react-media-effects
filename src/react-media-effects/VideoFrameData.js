/**
 * Note: this is not a react component!
 */

export default class VideoFrameData {
  constructor(canvasContext, width, height) {
    this.canvasContext = canvasContext;
    this.imageData = this.canvasContext.getImageData(0, 0, width, height);
    this.width = width;
    this.height = height;
  }

  calcBaseIndex(col, row) {
    return (this.width * row + col) * 4;
  }

  set(col, row, {r, g, b, a}) {
    const baseIdx = this.calcBaseIndex(col, row);

    // if an rgba value is not passed in, don't modify it
    if (r) this.imageData.data[baseIdx + 0] = r;
    if (g) this.imageData.data[baseIdx + 1] = g;
    if (b) this.imageData.data[baseIdx + 2] = b;
    if (a) this.imageData.data[baseIdx + 3] = a;
  }

  get(col, row) {
    const baseIdx = this.calcBaseIndex(col, row);
    return {
      r: this.imageData.data[baseIdx + 0],
      g: this.imageData.data[baseIdx + 1],
      b: this.imageData.data[baseIdx + 2],
      a: this.imageData.data[baseIdx + 3]
    };
  }

  /**
   * You probably don' want to call this function! This function is designed to
   * be called only by the constructor when they are ready to update the canvas.
   * Don't call this if you are implementing filter() function
   */
  putImageData() {
    this.canvasContext.putImageData(this.imageData, 0, 0);
  }
}
