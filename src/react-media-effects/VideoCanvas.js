import React, { Component } from 'react';
import {
  computeCanvasDimensions
} from './canvas-util';
import VideoFrameData from './VideoFrameData';

/**
 * Allow performing effects by accepting a filter function:
 * function filter(data: VideoFrameData) {...}
 *
 * VideoFrameData exposes an interface for settings pixel data on the canvas
 * without needing to calculate indices of the Uint8ClampedArray.
 */

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

      // draw the actual video frame
      this.canvasContext.drawImage(
        this.props.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );

      // if there is a filter function and the video is already rendering,
      // filter the current frame.
      if (this.props.filter && this.canvasElement.width && this.canvasElement.height) {
        const frameData = new VideoFrameData(
          this.canvasContext,
          this.canvasElement.width,
          this.canvasElement.height
        );
        this.props.filter(frameData);

        frameData.putImageData();
      }
    },
      1000 / this.props.frameRate
    );
  }

  saveCanvasRef = canvas => {
    // save a ref to the canvas element, and a 2d context for the canvas
    this.canvasElement = canvas;
    this.canvasContext = canvas.getContext('2d');
  }

  render() {
    // Height and width props are the requested ones like you would pass to html
    // video tag as attribs.
    const { height, width, videoHeight, videoWidth } = this.props;
    const { canvasHeight, canvasWidth } = computeCanvasDimensions(
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
