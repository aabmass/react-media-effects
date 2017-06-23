import React, { Component } from 'react';

class VideoCanvas extends Component {
  static defaultProps = {
    frameRate: 60
  }

  intervalId = 0;

  componentDidMount() {
    this.createOrUpdateRenderingInterval();
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: this may be unnecessary, need to test...
    this.createOrUpdateRenderingInterval();
  }

  createOrUpdateRenderingInterval() {
    /*
     * Set up interval based on props. If there is already an interval running,
     * clear it as well.
     */

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (!this.canvasElement || !this.canvasContext) {
        // the refs don't exist yet, just return
        return;
      }

      this.canvasContext.drawImage(
        this.props.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );
    },
      1000 / this.props.frameRate
    );
  }

  saveCanvasRef = canvas => {
    // save a ref to the canvas element, and a 2d context for the canvas
    this.canvasElement = canvas;
    this.canvasContext = canvas.getContext('2d');
  }

  computeCanvasDimensions(height, width, videoHeight, videoWidth) {
    /*
     * Canvas dimensions need to be computed based on the constraints given as
     * props (e.g. if one or both of height, width are passed) and the
     * dimensions of the video being played (i.e. the videoHeight and videoWidth
     * of the actual media). If both are given, choose keep the aspect ratio
     * without exceeding the given values.
     */
    
    let canvasHeight = Number(height) || 0;
    let canvasWidth = Number(width) || 0;
    const aspect = videoWidth / videoHeight || 0;

    if (!aspect) {
      return { canvasHeight, canvasWidth };
    }

    // neither given
    if (canvasHeight === 0 && canvasWidth === 0) {
      canvasHeight = videoHeight;
      canvasWidth = videoWidth;
    }
    // only height given
    else if (canvasHeight !== 0 && canvasWidth === 0) {
      canvasWidth = aspect * canvasHeight;
    }
    // only width given
    else if (canvasWidth !== 0 && canvasHeight === 0) {
      canvasHeight = canvasWidth / aspect;
    }
    // both given
    else {
      const possibleHeight = canvasWidth / aspect;
      const possibleWidth = aspect * canvasHeight;

      if (possibleHeight < canvasHeight) {
        canvasHeight = possibleHeight;
      }
      else {
        canvasWidth = possibleWidth;
      }
    }

    return { canvasHeight, canvasWidth };
  }

  render() {
    // Height and width props are the requested ones like you would pass to html
    // video tag as attribs.
    const { height, width, videoHeight, videoWidth } = this.props;
    const { canvasHeight, canvasWidth } = this.computeCanvasDimensions(
      height,
      width,
      videoHeight,
      videoWidth
    );

    return (
      <div>
        <canvas
          ref={this.saveCanvasRef}
          height={canvasHeight}
          width={canvasWidth}
        />
      </div>
    );
  }
}

export default VideoCanvas;