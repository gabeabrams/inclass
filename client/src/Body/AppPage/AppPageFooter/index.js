import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import WorkingButton from './WorkingButton';
import InstallButton from './InstallButton';
import UninstallButton from './UninstallButton';
import SupportButton from './SupportButton';

/**
 * Renders the entire footer with install, uninstall, and support button.
 *   Handles the logic of showing install or uninstall button
 */
class AppPageFooter extends Component {
  render() {
    // Deconstruct props
    const {
      onInstallClicked,
      onUninstallClicked,
      onSupportClicked,
      isInstalled,
      working,
    } = this.props;

    // Initializes either Uninstall or Install button
    //  depending if app is installed
    //  or Working button if currently installing
    // Leaves the uninitialized button as undefined
    let leftButton;
    if (working) {
      leftButton = (
        <WorkingButton />
      );
    } else if (isInstalled) {
      leftButton = (
        <UninstallButton onClick={onUninstallClicked} />
      );
    } else {
      leftButton = (
        <InstallButton onClick={onInstallClicked} />
      );
    }

    return (
      // Shows support button and either install or uninstall button
      <div className="apppagefooter-container">
        {leftButton}
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
  isInstalled: PropTypes.bool.isRequired,
  // If true, app is currently working
  working: PropTypes.bool.isRequired,
};

export default AppPageFooter;
