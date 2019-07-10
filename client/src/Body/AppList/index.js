import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';

class AppList extends Component {
  render() {
    const { apps } = this.props;
    const appElements = Object.keys(apps).map((appId) => {
      const opts = {
        creator: apps[appId].creator,
        // Pass in from parent!!
        iconURL: `https://localhost${apps[appId].icon.url}`,
        title: apps[appId].title,
        subtitle: apps[appId].subtitle,
        tags: apps[appId].tags,
      };
      return (<AppItem opts={opts} />);
    });
    return (
      <div>
        {appElements}
      </div>
    );
  }
}

AppList.propTypes = {
  // The apps we need to display
  apps: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AppList;
