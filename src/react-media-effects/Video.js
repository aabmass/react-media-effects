import React, { Component } from 'react';

class Video extends Component {
  // TODO: add default props for frameRate

  constructor(props) {
    super(props);

    // a true interval is guaranteed to be non-zero, so, if set, intervalId can
    // be truthy
    this.intervalId = 0;

    this.state = {
      videoHeight: 0,
      videoWidth: 0
    };
  }

  componentDidMount() {
    // update the state with the true size of the video DOM element and let
    // react handle re-rendering the canvas with this new size

    this.videoElement.play();
    this.createOrUpdateRenderingInterval();
  }

  componentDidUpdate(prevProps, prevState) {
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
        this.videoElement,
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

  saveVideoRef = video => {
    this.videoElement = video;
  }

  onCanPlay = e => {
    const { videoHeight, videoWidth } = this.videoElement;
    this.setState({
      videoHeight,
      videoWidth
    });
  }

  computeCanvasDimensions(height, width) {
    /*
     * Canvas dimensions need to be computed based on the constraints given as
     * props (e.g. if one or both of height, width are passed) and the
     * dimensions of the video being played (i.e. the videoHeight and videoWidth
     * of the actual media). If both are given, choose keep the aspect ratio
     * without exceeding the given values.
     */
    
    let canvasHeight = Number(height) || 0;
    let canvasWidth = Number(width) || 0;
    const aspect = this.state.videoWidth / this.state.videoHeight || 0;

    if (!aspect) {
      return { canvasHeight, canvasWidth };
    }

    // neither given
    if (canvasHeight === 0 && canvasWidth === 0) {
      canvasHeight = this.state.videoHeight;
      canvasWidth = this.state.videoWidth;
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
    const { height, width, ...restProps } = this.props;
    const { canvasHeight, canvasWidth } = this.computeCanvasDimensions(height, width);

    return (
      <div>
        <canvas
          ref={this.saveCanvasRef}
          height={canvasHeight}
          width={canvasWidth}
        />

        {/* Setting the height to 0 makes the video show only the controls.
          Hopefully this works cross browser.. */}
        <video
          ref={this.saveVideoRef}
          onCanPlay={this.onCanPlay}
          width={canvasWidth}
          height={0}
          {...restProps}
        />
      </div>
    );
  }
}

/* export as named and default */
export {
  Video
};

export default Video;
