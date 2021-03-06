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
      onAppSelected,
      isFiltering,
      isInstalled,
      working,
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
            isInstalled={isInstalled}
            working={working}
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
        onAppSelected={onAppSelected}
        isFiltering={isFiltering}
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
  // Function for when install button is clicked (installs app)
  onInstallClicked: PropTypes.func.isRequired,
  // Function for when uninstall button is clicked (uninstalls app)
  onUninstallClicked: PropTypes.func.isRequired,
  // Function for when support button is clicked (bring up email modal)
  onSupportClicked: PropTypes.func.isRequired,
  // Function called when specific app in app list is clicked
  onAppSelected: PropTypes.func.isRequired,
  // Bool that determines if apps are being filtered
  isFiltering: PropTypes.bool,
  // Boolean for if app is installed yet
  isInstalled: PropTypes.bool.isRequired,
  // If true, an app is currently being installed or uninstalled
  working: PropTypes.bool.isRequired,
};

Body.defaultProps = {
  // By default, no specific app is selected
  currentSpecificApp: null,
  // By default, the apps are not being filtered
  isFiltering: false,
};

export default Body;
