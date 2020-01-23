// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Modal from '..';
import EmailForm from '../../shared/EmailForm';
import OkayButton from '../../shared/OkayButton';

// Import helpers
import writeLog from '../../utils/writeLog';

class RequestInstallOrUninstall extends Component {
  /**
   * Render the Modal
   */
  render() {
    // deconstruct the props
    const {
      address,
      courseId,
      appName,
      onClose,
      uninstalling,
    } = this.props;

    // Log the fact that someone viewed the request page
    writeLog(
      `request-${uninstalling ? 'uninstall' : 'install'}`,
      {
        appName,
        courseId,
        supportEmail: address,
      }
    );

    // Require install modal needs an Okay button as footer
    const modalFooter = (
      <div>
        <OkayButton text="Close" onClick={onClose} />
      </div>
    );

    // generate the subject of the support email
    const subject = (
      `I want to ${(uninstalling) ? 'uninstall' : 'install'} ${appName} ${(uninstalling) ? 'from' : 'into'} course ${courseId}`
    );

    const title = `To ${(uninstalling) ? 'uninstall' : 'install'} this app, request it via email`;

    return (
      <div className="request-install-uninstall-modal">
        <Modal
          title={title}
          onClose={onClose}
          footer={modalFooter}
        >
          <EmailForm address={address} subject={subject} />
        </Modal>
      </div>
    );
  }
}

RequestInstallOrUninstall.propTypes = {
  // the email address to send to
  address: PropTypes.string.isRequired,
  // the title of the catalog the app is in
  courseId: PropTypes.number.isRequired,
  /* the title of tha app */
  appName: PropTypes.string.isRequired,
  /* Function to call when the modal is closed */
  onClose: PropTypes.func.isRequired,
  /* Install boolean to determine use for install or uninstall */
  uninstalling: PropTypes.bool,
};

RequestInstallOrUninstall.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default RequestInstallOrUninstall;
