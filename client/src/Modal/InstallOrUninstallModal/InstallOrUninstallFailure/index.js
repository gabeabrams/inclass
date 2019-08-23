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

    // Install failure modal requires an Okay button for footer
    const modalFooter = (
      <div>
        <SupportButton onClick={onSupportButtonClicked} />
        <OkayButton onClick={onClose} />
      </div>
    );

    return (
      <div className="install-uninstall-failure-modal">
        <Modal
          title={`\u2718 ${(uninstalling) ? 'Uninstall Failed' : 'Install Failed'}!`}
          onClose={onClose}
          footer={modalFooter}
          titleBackgroundColor="#df9f9f"
        >
          <FailureReason message={message} />
        </Modal>
      </div>
    );
  }
}

InstallOrUninstallFailure.propTypes = {
  /* Function to call when the modal is closed, i.e. when okay button clicked */
  onClose: PropTypes.func.isRequired,
  /* Function to call to show support steps */
  onSupportButtonClicked: PropTypes.func.isRequired,
  /* Message to display to user why install/uninstall failed */
  message: PropTypes.string.isRequired,
  /* Install boolean to determine use for install or uninstall */
  uninstalling: PropTypes.bool,
};

InstallOrUninstallFailure.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default InstallOrUninstallFailure;
