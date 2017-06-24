import React, { Component } from 'react';
import VideoCanvas from './VideoCanvas';

/**
 * TODO: accept play prop (boolean) that indicates whether or not the video is
 * currently playing. Eventually, accept percentage seek and volume control
 * props, too!
 */
class Video extends Component {
  static defaultProps = {
    play: true
  }

  state = {
    videoElement: null,
    videoHeight: 0,
    videoWidth: 0
  }

  componentDidMount() {
    // factor out any props that shouldn't be set on the HTMLVideoElement
    const { play, ...restProps } = this.props;
    const videoElement = Object.assign(document.createElement('video'), restProps);

    // Once the video loads the first frame of data and knows the actual size,
    // update the state with this info.
    videoElement.addEventListener('loadeddata', e => {
      const { videoHeight, videoWidth } = videoElement;
      this.setState({
        videoHeight,
        videoWidth
      });

      this.setVideoPlay(videoElement, this.props.play);
    });

    this.setState({
      videoElement: videoElement
    });
  }

  componentWillReceiveProps(nextProps) {
    // check if any of the playback props have changed and update
    // this.state.videoElement accordingly

    if (this.props.play !== nextProps.play) {
      this.setVideoPlay(this.state.videoElement, nextProps.play);
    }
  }

  setVideoPlay(videoElement, shouldPlay) {
    if (shouldPlay) {
      videoElement.play();
    }
    else {
      videoElement.pause();
    }
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
