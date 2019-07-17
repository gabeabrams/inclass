// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?

class TabBar extends Component {
  render() {
    // Deconstruct props
    const {
      onClick,
      screenshotsActive,
      guidesActive,
      infoActive,
    } = this.props;
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#screenshots" className={`nav-link${screenshotsActive ? ' active' : ''}`} onClick={onClick}>Screenshots</a>
        </li>
        <li className="nav-item">
          <a href="#guides" className={`nav-link${guidesActive ? ' active' : ''}`} onClick={onClick}>Guides</a>
        </li>
        <li className="nav-item">
          <a href="#info" className={`nav-link${infoActive ? ' active' : ''}`} onClick={onClick}>Info</a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  screenshotsActive: PropTypes.bool,
  guidesActive: PropTypes.bool,
  infoActive: PropTypes.bool,

};

TabBar.defaultProps = {
  screenshotsActive: true,
  guidesActive: false,
  infoActive: false,
};

export default TabBar;
