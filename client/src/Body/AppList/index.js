import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';
import AppListStatusBar from './AppListStatusBar';

class AppList extends Component {
  render() {
    const {
      storeHost,
      apps,
      tagColors,
      onAppSelected,
      filtered,
      appCount,
    } = this.props;

    // display or hide the status bar depending on if it's being filtered
    const statusBarElement = (
      filtered
        ? <AppListStatusBar appCount={appCount} />
        : null
    );

    // map each app to AppItem element to render
    const appElements = Object.keys(apps).map((appId) => {
      return (
        <AppItem
          key={appId}
          app={apps[appId]}
          tagColors={tagColors}
          storeHost={storeHost}
          onClick={onAppSelected}
          dark
        />
      );
    });

    return (
      <div className="app-list-container d-flex flex-column">
        {statusBarElement}
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
  // Function called when specific app in app list is clicked
  onAppSelected: PropTypes.func.isRequired,
  // whether the app list is being filtered
  filtered: PropTypes.bool,
  // how many apps are displayed after filtering
  appCount: PropTypes.number,
};

AppList.defaultProps = {
  // default is set to not displaying status bar
  filtered: false,
  // default app count is 0
  appCount: 0,
};

export default AppList;
