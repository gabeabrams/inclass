// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '.';
import EmailForm from '../shared/EmailForm';

class SupportModal extends Component {
  /**
   * Render the Modal
   */
  render() {
    const { address, subject, onClose } = this.props;

    return (
      <Modal title="Send an email to get support" onClose={onClose}>
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
