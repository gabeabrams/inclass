// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '..';
import OkayButton from '../../shared/OkayButton';
import MessageBody from './MessageBody';

class InstallOrUninstallSuccess extends Component {
  /**
   * Render the Modal
   */
  render() {
    // deconstruct the props
    const {
      appName,
      message,
      onClose,
      uninstalling,
    } = this.props;

    // Install success modal requires an Okay button for footer
    const modalFooter = (
      <div>
        <OkayButton onClick={onClose} />
      </div>
    );

    return (
      <Modal
        title={`${appName} ${(uninstalling) ? 'Uninstalled' : 'Installed'}!`}
        onClose={onClose}
        footer={modalFooter}
      >
        {/* MessageBody has a default value of 'refresh canvas page' */}
        <MessageBody messageBody={
          (message)
            ? `${message} 
            Now, refresh your Canvas page for the changes to be applied.`
            : 'Now, refresh your Canvas page for the changes to be applied.'
          }
        />
      </Modal>
    );
  }
}

InstallOrUninstallSuccess.propTypes = {
  /* Function to call when the modal is closed */
  onClose: PropTypes.func.isRequired,
  /* Message to display in the messageBody */
  message: PropTypes.string.isRequired,
  /* App name to display in modal title */
  appName: PropTypes.string.isRequired,
  /* Install boolean to determine use for install or uninstalling */
  uninstalling: PropTypes.bool,
};

InstallOrUninstallSuccess.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default InstallOrUninstallSuccess;
