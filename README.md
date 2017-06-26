react-media-effects
========
React components for applying arbitrary visual effects to HTML media.

## Install
[NPM Package](https://www.npmjs.com/package/react-media-effects)

```sh
npm install --save react-media-effects
# or
yarn add react-media-effects
```

## Components
### `Video`
The video component renders an HTML5 video into a canvas, allowing you to
modify the pixel data with a `filter()` function. Your `filter()`
function should accept one parameter, a `VideoFrameData` instance which
provides a simple API for modifying pixels.
#### Props:
* `filter` - a function accepting a `VideoFrameData` instance that will be
called for each frame drawn to the internal canvas.
* `frameRate` - an integer frames per second value. Defaults to 60 fps, but
if your `filter()` is computation heavy, you may want to decrease it for
better performance.
* `play` - a boolean to play/pause the video.
* any HTML5 video attributes passed in will be respected *if possible*,
e.g. `height`, `width`, etc. Unfortunately, controls do not currently work.

#### Example
```js
import React, { Component } from 'react';
import Video from 'react-media-effects';

const greenFilter = (frameData) => {
  // increase the green channel of every pixel in the frame for a green tint
  for (var i = 0; i < frameData.width - 1; ++i) {
    for (var j = 0; j < frameData.height; ++j) {
      const pix = frameData.get(i, j);
      pix.g += 50;
      frameData.set(i, j, pix);
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
```

## Other
### `VideoFrameData`
A small class that simplifies access to the pixel data.

#### Public API
* `set(col: integer, row: integer, rgba: Object)` - Set a pixel in the frame
to a specific value. If you pass only some channel values for rgba, the current
value will be kept, e.g. `{r: 10, g: 100}` will modify only the red and green
channels.
* `get(col: integer, row: integer) -> rgba: Object` - Get the value of pixel
in the video frame.

#### Using the `CanvasRenderingContext2D` directly
If you'd really like to instead modify the canvas on your own with the
`CanvasRenderingContext2D`, it is accessible as `VideoFrameData.canvasContext`.
