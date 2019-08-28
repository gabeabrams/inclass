import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Allows tab box to apply one style to all contents (its children)
 */
class TabBox extends Component {
  render() {
    // Children are Guides, Info or Screenshots module
    const { children } = this.props;
    return (
      <div className="tabbox-container">
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
