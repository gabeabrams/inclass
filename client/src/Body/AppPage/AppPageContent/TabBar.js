// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?

class TabBar extends Component {
  render() {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#screenshots" className="nav-link active">Screenshots</a>
        </li>
        <li className="nav-item">
          <a href="#guides" className="nav-link">Guides</a>
        </li>
        <li className="nav-item">
          <a href="#info" className="nav-link">Info</a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {

};

export default TabBar;
