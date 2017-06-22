import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Video from './react-media-effects';

class App extends Component {
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
            src="https://ia801606.us.archive.org/26/items/Glass_201703/Glass.mp4"
            className="centered"
            width="600px"
            controls
          />
        </div>
      </div>

    );
  }
}

export default App;
