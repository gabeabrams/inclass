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
      onBypass,
      uninstalling,
      isAdmin,
    } = this.props;

    // Log the fact that someone viewed the request page
    const type = `request-${uninstalling ? 'uninstall' : 'install'}`;
    const payload = {
      appName,
      courseId,
    };
    payload[`request${uninstalling ? 'Uninstall' : 'Install'}Email`] = address;
    writeLog(type, payload);

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

    // Generate bypass
    let bypassElem;
    if (isAdmin) {
      bypassElem = (
        <div className="alert alert-info mt-3 mb-0">
          <p className="lead m-0 text-center">
            You are an admin, so you can
            <button
              type="button"
              className="btn btn-secondary ml-2 mr-2"
              aria-label="bypass the request step"
              onClick={onBypass}
            >
              bypass
            </button>
            this step.
          </p>
        </div>
      );
    }

    return (
      <div className="request-install-uninstall-modal">
        <Modal
          title={title}
          onClose={onClose}
          footer={modalFooter}
        >
          <EmailForm address={address} subject={subject} />
          {bypassElem}
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
  /* Function to call when request is bypassed (only available for admins) */
  onBypass: PropTypes.func.isRequired,
  // If true, the user is an admin
  isAdmin: PropTypes.bool.isRequired,
  /* Install boolean to determine use for install or uninstall */
  uninstalling: PropTypes.bool,
};

RequestInstallOrUninstall.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default RequestInstallOrUninstall;
