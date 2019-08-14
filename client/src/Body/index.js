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
    const {
      currentBodyType,
      currentSpecificApp,
      storeHost,
      apps,
      tags,
      onInstallClicked,
      onUninstallClicked,
      onSupportClicked,
    } = this.props;

    // Show the app page
    if (
      currentBodyType === BODY_TYPE.APP_PAGE
      && currentSpecificApp
    ) {
      return (
        <div className="h-100">
          <AppPage
            storeHost={storeHost}
            app={currentSpecificApp}
            tagColors={tags}
            onInstallClicked={onInstallClicked}
            onUninstallClicked={onUninstallClicked}
            onSupportClicked={onSupportClicked}
          />
        </div>
      );
    }

    // Assume showing the app list
    return (
      <AppList
        storeHost={storeHost}
        apps={apps}
        tagColors={tags}
      />
    );
  }
}

Body.propTypes = {
  // The view type
  currentBodyType: PropTypes.string.isRequired,
  // The app to show in the body (if body type is app page)
  currentSpecificApp: PropTypes.objectOf(PropTypes.any),
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  // The apps we need to display
  apps: PropTypes.objectOf(PropTypes.object).isRequired,
  // The tags information for the app
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  onInstallClicked: PropTypes.func.isRequired,
  onUninstallClicked: PropTypes.func.isRequired,
  onSupportClicked: PropTypes.func.isRequired,
};

Body.defaultProps = {
  // By default, no specific app is selected
  currentSpecificApp: null,
};

export default Body;
