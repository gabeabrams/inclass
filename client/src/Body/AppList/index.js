import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppListStatusBar from './AppListStatusBar';
import AppCreatorTag from '../../shared/AppItem/AppCreatorTag';

class AppList extends Component {
  render() {
    return (
      <div>
        <AppListStatusBar appCount={12} />
        <AppCreatorTag creator={['DCE', 'SEAS']} />
      </div>
    );
  }
}

export default AppList;
