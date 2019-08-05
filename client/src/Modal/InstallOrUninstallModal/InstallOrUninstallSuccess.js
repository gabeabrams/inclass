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
      uninstall,
    } = this.props;

    const modalFooter = (
      <div>
        <OkayButton onClick={onClose} />
      </div>
    );

    return (
      <Modal
        title={`${appName} ${(uninstall) ? 'Uninstalled' : 'Installed'}!`}
        onClose={onClose}
        footer={modalFooter}
      >
        <MessageBody messageBody={message} />
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
  /* Install boolean to determine use for install or uninstall */
  uninstall: PropTypes.bool,
};

InstallOrUninstallSuccess.defaultProps = {
  /* Assume display installing */
  uninstall: false,
};

export default InstallOrUninstallSuccess;
