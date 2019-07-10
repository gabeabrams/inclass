import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppList from './AppList';
import AppPage from './AppPage';

// Import body types
import BODY_TYPE from './BODY_TYPE';

class Body extends Component {
  render() {
    // Deconstruct props
    const { currentBodyType, storeHost, apps } = this.props;
    console.log(apps);

    // Show the app page
    if (currentBodyType === BODY_TYPE.APP_PAGE) {
      return (
        <div className="h-100 overflow-hidden">
          <AppPage
            storeHost={storeHost}
          />
        </div>
      );
    }

    // Assume showing the app list
    return (
      <AppList storeHost={storeHost} apps={apps} />
    );
  }
}

Body.propTypes = {
  // The view type
  currentBodyType: PropTypes.string.isRequired,
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  // The apps we need to display
  apps: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Body;
