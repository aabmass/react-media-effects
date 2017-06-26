import React, { Component } from 'react';
import Video from './react-media-effects';

const greenFilter = (frameData) => {
  // increase the green channel of every pixel in the frame for a green tint
  frameData.map(({ /* r, b, a, */ g }) => ({g: g + 50}) );
};

// eslint-disable-next-line
const rowDiffFilter = (frameData) => {
  // an edge detection effect by taking the difference across a row
  for (var i = 0; i < frameData.width - 1; ++i) {
    for (var j = 0; j < frameData.height; ++j) {
      const right = frameData.get(i + 1, j);
      const left = frameData.get(i, j);
      let diff = {
        r: right.r - left.r,
        g: right.g - left.g,
        b: right.b - left.b,
      }
      const scale = 10;
      diff.r *= scale;
      diff.g *= scale;
      diff.b *= scale;

      frameData.set(i, j, diff);
    }
  }
};

class Example extends Component {
  state = {
    play: true
  }

  onPlayPause = e => {
    // toggle
    this.setState({
      play: !this.state.play
    });
  }

  render() {
    return (
      <div>
        <h2>Here are some effects:</h2>

        {/* open source movie: https://archive.org/details/Glass_201703 */}
        <Video
          src="Glass.mp4"
          className="centered"
          width="600"
          filter={greenFilter}
          play={this.state.play}
        />

        <div className="controls">
          <button onClick={this.onPlayPause}>Play/Pause</button>
        </div>
      </div>
    );
  }
}

export default Example;
