// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '..';
import EmailForm from '../../shared/EmailForm';
import OkayButton from '../../shared/OkayButton';

class SupportModal extends Component {
  /**
   * Render the Modal
   */
  render() {
    const { address, subject, onClose } = this.props;
    const modalFooter = (
      <div>
        <OkayButton text="Close" onClick={onClose} />
      </div>
    );

    return (
      <Modal title="To install this app, request it via email" onClose={onClose} footer={modalFooter}>
        <EmailForm address={address} subject={subject} />
      </Modal>
    );
  }
}

SupportModal.propTypes = {
  // the email address to send to
  address: PropTypes.string.isRequired,
  // the subject of the email
  subject: PropTypes.string.isRequired,
  /* Function to call when the modal is closed */
  onClose: PropTypes.func.isRequired,
};

export default SupportModal;
