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

    // TODO: document this process:
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


    // TODO: show the uninstall button if the app is installed
    return (
      // Flexbox container for the entire footer with two buttons
      <div className="apppagefooter-container">
        {installButtonElem}
        {uninstallButtonElem}
        <SupportButton onClick={onSupportClicked} />
      </div>
    );
  }
}

AppPageFooter.propTypes = {
  // TODO: add comments
  onInstallClicked: PropTypes.func.isRequired,
  onUninstallClicked: PropTypes.func.isRequired,
  onSupportClicked: PropTypes.func.isRequired,
  appInstalled: PropTypes.bool,
};

AppPageFooter.defaultProps = {
  appInstalled: false,
};

export default AppPageFooter;
