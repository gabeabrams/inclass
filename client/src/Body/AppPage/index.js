import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppPageFooter from './AppPageFooter';
import AppPageContent from './AppPageContent';

// Note: this is a temporary function
const onSupportClicked = () => {
  console.log('clicked support button');
};
class AppPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appInstalled: false,
    };

    this.onInstallClicked = this.onInstallClicked.bind(this);
    this.onUninstallClicked = this.onUninstallClicked.bind(this);
  }

  onInstallClicked() {
    this.setState({
      appInstalled: true,
    });
  }

  onUninstallClicked() {
    this.setState({
      appInstalled: false,
    });
  }

  render() {
    // Deconstruct props
    const { app } = this.props;
    const { appInstalled } = this.state;
    return (
      <div className="appPage-container">
        <div className="appPage-content">
          <AppPageContent app={app} />
        </div>
        <div className="appPage-footer">
          {/* TODO: Pass in the functions for the AppPageFooter */}
          <AppPageFooter
            appInstalled={appInstalled}
            onInstallClicked={this.onInstallClicked}
            onUninstallClicked={this.onUninstallClicked}
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
};

export default AppPage;
