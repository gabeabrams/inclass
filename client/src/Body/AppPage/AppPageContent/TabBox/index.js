// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
// Ask Gabe about the es-lint error?
import Screenshots from './Screenshots';

class TabBox extends Component {
  render() {
    const { app } = this.props;
    return (
      <div>
        <Screenshots app={app} />
      </div>
    );
  }
}
TabBox.propTypes = {
  // The app whose screenshots we want
  app: PropTypes.shape({
    // Array of screenshots in the app
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default TabBox;
