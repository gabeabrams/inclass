// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '..';
import EmailForm from '../../shared/EmailForm';
import OkayButton from '../../shared/OkayButton';

class RequestInstallOrUninstall extends Component {
  /**
   * Render the Modal
   */
  render() {
    // deconstruct the props
    const {
      address,
      catalog,
      appName,
      onClose,
      uninstalling,
    } = this.props;

    // Require install modal needs an Okay button as footer
    const modalFooter = (
      <div>
        <OkayButton text="Close" onClick={onClose} />
      </div>
    );

    // generate the subject of the support email
    const subject = (
      `I want to ${(uninstalling) ? 'uninstall' : 'install'} ${appName} ${(uninstalling) ? 'from' : 'into'} catalog: ${catalog}`
    );

    const title = `To ${(uninstalling) ? 'uninstall' : 'install'} this app, request it via email`;

    return (
      <Modal
        title={title}
        onClose={onClose}
        footer={modalFooter}
        titleBackgroundColor="#FFFACD"
      >
        <EmailForm address={address} subject={subject} />
      </Modal>
    );
  }
}

RequestInstallOrUninstall.propTypes = {
  // the email address to send to
  address: PropTypes.string.isRequired,
  // the title of the catalog the app is in
  catalog: PropTypes.string.isRequired,
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
