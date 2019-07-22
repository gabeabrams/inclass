// TODO: remove instruction comments
// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
// TODO: remove instruction comments
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
        {/* TODO: add comments to jsx */}
        <li className="nav-item">
          <a href="#screenshots" id="screenshots-tab" className={`nav-link${screenshotsActive ? ' active' : ''}`} onClick={onClick}>Screenshots</a>
        </li>
        <li className="nav-item">
          <a href="#guides" id="guides-tab" className={`nav-link${guidesActive ? ' active' : ''}`} onClick={onClick}>Guides</a>
        </li>
        <li className="nav-item">
          <a href="#info" id="info-tab" className={`nav-link${infoActive ? ' active' : ''}`} onClick={onClick}>Info</a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {
  // TODO: add descriptions for each prop
  // TODO: use TAB_NAMES as a value for an 'activeTab' prop instead of booleans
  onClick: PropTypes.func.isRequired,
  screenshotsActive: PropTypes.bool,
  guidesActive: PropTypes.bool,
  infoActive: PropTypes.bool,
};

TabBar.defaultProps = {
  // TODO: add comments explaining each default
  screenshotsActive: true,
  guidesActive: false,
  infoActive: false,
};

export default TabBar;
