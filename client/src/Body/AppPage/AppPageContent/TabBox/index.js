// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabBox extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

TabBox.propTypes = {
  // Contents of TabBox
  children: PropTypes.node.isRequired,
};

export default TabBox;
