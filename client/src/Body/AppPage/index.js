import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppPageFooter from './AppPageFooter';
import AppPageContent from './AppPageContent';
import AppItem from '../../shared/AppItem';

import './style.css';

class AppPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appInstalled: false,
    };
  }

  render() {
    // Deconstruct props
    const {
      app,
      storeHost,
      tagColors,
      onInstallClicked,
      onUninstallClicked,
      onSupportClicked,
    } = this.props;
    const { appInstalled } = this.state;

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
            appInstalled={appInstalled}
            onInstallClicked={onInstallClicked}
            onUninstallClicked={onUninstallClicked}
            onSupportClicked={onSupportClicked}
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
  onInstallClicked: PropTypes.func.isRequired,
  onUninstallClicked: PropTypes.func.isRequired,
  onSupportClicked: PropTypes.func.isRequired,
};

export default AppPage;
