import React, { Component } from 'react';

class Video extends Component {
  render() {
    return (
      <div>
        {/* open source movie: https://archive.org/details/Glass_201703 */}
        <video {...this.props} />
      </div>
    );
  }
}

/* export as named and default */
export {
  Video
};

export default Video;
