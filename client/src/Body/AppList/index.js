import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

// Import other components
import AppItem from '../../shared/AppItem';
import AppListStatusBar from './AppListStatusBar';

import './style.css';

class AppList extends Component {
  render() {
    const { storeHost, apps, tagColors } = this.props;
    const appElements = Object.keys(apps).map((appId) => {
      const opts = {
        creator: apps[appId].creator,
        iconURL: `https://${path.join(storeHost, apps[appId].icon.url)}`,
        title: apps[appId].title,
        subtitle: apps[appId].subtitle,
        tags: apps[appId].tags,
        tagColors,
      };
      return (<AppItem opts={opts} />);
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
