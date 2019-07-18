import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TAB_NAMES from './TAB_NAMES';

// Import other components
// TODO: remove instruction comments

class TabBar extends Component {
  render() {
    // Deconstruct props
    const {
      onClick,
      activeTab,
    } = this.props;
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#screenshots" className={`nav-link${(activeTab === TAB_NAMES.SCREENSHOTS) ? ' active' : ''}`} onClick={() => { onClick(TAB_NAMES.SCREENSHOTS); }}>Screenshots</a>
        </li>
        <li className="nav-item">
          <a href="#guides" className={`nav-link${(activeTab === TAB_NAMES.GUIDES) ? ' active' : ''}`} onClick={() => { onClick(TAB_NAMES.GUIDES); }}>Guides</a>
        </li>
        <li className="nav-item">
          <a href="#info" className={`nav-link${(activeTab === TAB_NAMES.INFO) ? ' active' : ''}`} onClick={() => { onClick(TAB_NAMES.INFO); }}>Info</a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {
  // TODO: add descriptions for each prop
  // TODO: use TAB_NAMES as a value for an 'activeTab' prop instead of booleans
  onClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default TabBar;
