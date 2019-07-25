import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';
import AppListStatusBar from './AppListStatusBar';
import EmailForm from '../../shared/EmailForm';

import './style.css';

class AppList extends Component {
  render() {
    const {
      storeHost,
      apps,
      tagColors,
    } = this.props;

    // map each app to AppItem element to render
    const appElements = Object.keys(apps).map((appId) => {
      return (
        <AppItem
          app={apps[appId]}
          tagColors={tagColors}
          storeHost={storeHost}
          dark
        />
      );
    });

    return (
      <div className="app-list-container">
        <AppListStatusBar appCount={Object.keys(apps).length} />
        {appElements}
      </div>
    );
  }
}

AppList.propTypes = {
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  // The apps we need to display
  apps: PropTypes.objectOf(PropTypes.object).isRequired,
  // The tags color information for the app
  tagColors: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AppList;
