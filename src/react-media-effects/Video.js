import React, { Component } from 'react';
import VideoCanvas from './VideoCanvas';

class Video extends Component {
  render() {
    /*
     * Create a video element video element but don't insert it into the DOM.
     * Just give it the properties it expects and pass the element to
     * VideoCanvas as a prop.
     */
    const videoElement = Object.assign(document.createElement('video'), this.props);

    return (
      <div>
        <VideoCanvas
          videoElement={videoElement}
          frameRate={this.props.frameRate}
          height={this.props.height}
          width={this.props.width}
        />
        {/* controls will go here */}
      </div>
    );
  }
}

/* export as named and default */
export {
  Video
};

export default Video;
