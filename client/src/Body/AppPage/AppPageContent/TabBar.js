import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TAB_NAMES from './TAB_NAMES';

class TabBar extends Component {
  render() {
    // Deconstruct props
    const {
      onClick,
      currentTab,
    } = this.props;
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#screenshots" className={`nav-link${(currentTab === TAB_NAMES.SCREENSHOTS) ? ' active' : ''}`} onClick={() => { onClick(TAB_NAMES.SCREENSHOTS); }}>Screenshots</a>
        </li>
        <li className="nav-item">
          <a href="#guides" className={`nav-link${(currentTab === TAB_NAMES.GUIDES) ? ' active' : ''}`} onClick={() => { onClick(TAB_NAMES.GUIDES); }}>Guides</a>
        </li>
        <li className="nav-item">
          <a href="#info" className={`nav-link${(currentTab === TAB_NAMES.INFO) ? ' active' : ''}`} onClick={() => { onClick(TAB_NAMES.INFO); }}>Info</a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {
  // Sets current tab to the one clicked
  onClick: PropTypes.func.isRequired,
  // The tab currently displayed
  currentTab: PropTypes.string.isRequired,
};

export default TabBar;
