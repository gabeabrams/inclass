import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppListStatusBar from './AppListStatusBar';

class AppList extends Component {
  render() {
    return (
      <AppListStatusBar appCount={12} />
    );
  }
}

export default AppList;
