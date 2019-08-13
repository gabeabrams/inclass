import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TAB_NAMES from './TAB_NAMES';

class TabBar extends Component {
  render() {
    // Deconstruct props
    const {
      onTabChanged,
      currentTab,
    } = this.props;

    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="#screenshots"
            id="screenshots"
            // shows screenshots if currentTab equals screenshots
            className={
              `nav-link${
                (currentTab === TAB_NAMES.SCREENSHOTS) ? ' active' : ''
              }`
            }
            onClick={() => { onTabChanged(TAB_NAMES.SCREENSHOTS); }}
          >
            Screenshots
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#guides"
            id="guides"
            // shows guides if currentTab equals guides
            className={
              `nav-link${
                (currentTab === TAB_NAMES.GUIDES) ? ' active' : ''
              }`
            }
            onClick={() => { onTabChanged(TAB_NAMES.GUIDES); }}
          >
            Guides
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#info"
            id="info"
            // shows info if currentTab equals info
            className={`nav-link${
              (currentTab === TAB_NAMES.INFO) ? ' active' : ''
            }`}
            onClick={() => { onTabChanged(TAB_NAMES.INFO); }}
          >
            Info
          </a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {
  // Sets current tab to the one clicked
  onTabChanged: PropTypes.func.isRequired,
  // The tab currently displayed
  currentTab: PropTypes.string.isRequired,
};

export default TabBar;
