import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './Example';

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
          <Example />
        </div>
      </div>
    );
  }
}

export default App;
