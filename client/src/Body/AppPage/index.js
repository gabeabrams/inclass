import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppPageFooter from './AppPageFooter';
import AppPageContent from './AppPageContent';
import AppItem from '../../shared/AppItem';

import './style.css';

class AppPage extends Component {
  render() {
    // Deconstruct props
    const {
      app,
      storeHost,
      tagColors,
      onInstallClicked,
      onUninstallClicked,
      onSupportClicked,
      isInstalled,
    } = this.props;

    return (
      <div className="appPage-container">
        <div className="appPage-appitem">
          <AppItem
            app={app}
            storeHost={storeHost}
            tagColors={tagColors}
          />
        </div>
        <div className="appPage-content">
          <AppPageContent app={app} storeHost={storeHost} />
        </div>
        <div className="appPage-footer">
          <AppPageFooter
            onInstallClicked={onInstallClicked}
            onUninstallClicked={onUninstallClicked}
            onSupportClicked={onSupportClicked}
            isInstalled={isInstalled}
          />
        </div>
      </div>
    );
  }
}

AppPage.propTypes = {
  // The app to display
  app: PropTypes.shape({
    // Array of screenshots in the app
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }).isRequired,
  // The host for the URL
  storeHost: PropTypes.string.isRequired,
  // Object with the colors for each tag
  tagColors: PropTypes.objectOf(PropTypes.object).isRequired,
  // Function that occurs when install button clicked
  onInstallClicked: PropTypes.func.isRequired,
  // Function that occurs when uninstall button clicked
  onUninstallClicked: PropTypes.func.isRequired,
  // Function that occurs when support button clicked
  onSupportClicked: PropTypes.func.isRequired,
  // Boolean for if app is installed yet
  isInstalled: PropTypes.bool.isRequired,
};

export default AppPage;
