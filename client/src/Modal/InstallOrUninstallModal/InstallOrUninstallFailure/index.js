// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../..';
import OkayButton from '../../../shared/OkayButton';
import SupportButton from '../../../shared/SupportButton';
import FailureReason from './FailureReason';


class InstallOrUninstallFailure extends Component {
  /**
   * Render the Modal
   */
  render() {
    const {
      onClose,
      onSupportButtonClicked,
      message,
      uninstalling,
    } = this.props;

    const modalFooter = (
      <div>
        <OkayButton onClick={onClose} />
      </div>
    );

    return (
      <Modal
        title={`${(uninstalling) ? 'Uninstall Failed' : 'Install Failed'}!`}
        onClose={onClose}
        footer={modalFooter}
      >
        <FailureReason message={message} />
        <SupportButton onClick={onSupportButtonClicked} />
      </Modal>
    );
  }
}

InstallOrUninstallFailure.propTypes = {
  /* Function to call when the modal is closed, i.e. when okay button clicked */
  onClose: PropTypes.func.isRequired,
  /* Function to call to show support steps */
  onSupportButtonClicked: PropTypes.func.isRequired,
  /* Message to display to user before they can install the app */
  message: PropTypes.string.isRequired,
  /* Install boolean to determine use for install or uninstall */
  uninstalling: PropTypes.bool,
};

InstallOrUninstallFailure.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default InstallOrUninstallFailure;
