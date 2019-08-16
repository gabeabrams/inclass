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
    } = this.props;

    // map each app to AppItem element to render
    const appElements = Object.keys(apps).map((appId) => {
      return (
        <AppItem
          key={appId}
          app={apps[appId]}
          tagColors={tagColors}
          storeHost={storeHost}
          onAppSelected={onAppSelected}
          dark
        />
      );
    });

    return (
      <div className="app-list-container d-flex flex-column">
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
  // Function called when specific app in app list is clicked
  onAppSelected: PropTypes.func.isRequired,
};

export default AppList;
