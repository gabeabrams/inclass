import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import InstallButton from './InstallButton';
import UninstallButton from './UninstallButton';
import SupportButton from './SupportButton';

class AppPageFooter extends Component {
  render() {
    // Deconstruct props
    const {
      onInstallClicked,
      onUninstallClicked,
      onSupportClicked,
      appInstalled,
    } = this.props;

    // Initializes either Uninstall or Install button
    //  depending if app is installed
    // Leaves the uninitialized button as undefined
    let installButtonElem;
    let uninstallButtonElem;
    if (appInstalled) {
      uninstallButtonElem = (
        <UninstallButton onClick={onUninstallClicked} />
      );
    } else {
      installButtonElem = (
        <InstallButton onClick={onInstallClicked} />
      );
    }

    return (
      // Shows support button and either install or uninstall button
      <div className="apppagefooter-container">
        {installButtonElem}
        {uninstallButtonElem}
        <SupportButton onClick={onSupportClicked} />
      </div>
    );
  }
}

AppPageFooter.propTypes = {
  // Function that occurs when install button clicked
  onInstallClicked: PropTypes.func.isRequired,
  // Function that occurs when uninstalled button clicked
  onUninstallClicked: PropTypes.func.isRequired,
  // Function that occurs when support button clicked
  onSupportClicked: PropTypes.func.isRequired,
  // Boolean for if app is installed yet
  appInstalled: PropTypes.bool,
};

AppPageFooter.defaultProps = {
  // App is automatically not installed
  appInstalled: false,
};

export default AppPageFooter;
