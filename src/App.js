import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Video from './react-media-effects';

function alphaTopCornerFilter(frameData) {
  // for testing, just set top right corner partially transparent with alpha
  // channel
  for (var i = frameData.width - 1; i > frameData.width - 200; --i) {
    for (var j = 0; j < 100; ++j) {
      frameData.set(i, j, {
        a: 200
      });
    }
  }
}

function horizontalDerivative(frameData) {
  // an edge detection effect
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
}

class App extends Component {
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div id="main">
          <h2>Here are some effects:</h2>       

          {/* open source movie: https://archive.org/details/Glass_201703 */}
          <Video
            src="Glass.mp4"
            className="centered"
            width="600"
            controls
            filter={horizontalDerivative}
            play={this.state.play}
          />

          <div className="controls">
            <button onClick={this.onPlayPause}>Play/Pause</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
