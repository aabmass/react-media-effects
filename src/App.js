import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Video from './react-media-effects';

function filter(frameData) {
  // for testing, just set top left corner partially transparent with alpha
  // channel
  for (var i = 0; i < 50; ++i) {
    for (var j = 0; j < 50; ++j) {
      frameData.set(i, j, {
        a: 100
      });
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
            filter={filter}
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
