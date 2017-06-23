import React, { Component } from 'react';
import VideoCanvas from './VideoCanvas';

class Video extends Component {
  state = {
    videoElement: null,
    videoHeight: 0,
    videoWidth: 0
  }

  componentDidMount() {
    const videoElement = Object.assign(document.createElement('video'), this.props);

    // Once the video loads the first frame of data and knows the actual size,
    // update the state with this info.
    videoElement.addEventListener('loadeddata', e => {
      const { videoHeight, videoWidth } = videoElement;
      this.setState({
        videoHeight,
        videoWidth
      });

      videoElement.play();
    });

    this.setState({
      videoElement: videoElement
    });
  }

  render() {
    return (
      <div>
        <VideoCanvas
          videoElement={this.state.videoElement}
          frameRate={this.props.frameRate}
          height={this.props.height}
          width={this.props.width}
          videoHeight={this.state.videoHeight}
          videoWidth={this.state.videoWidth}
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
