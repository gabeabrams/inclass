// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../..';
import OkayButton from '../../../shared/OkayButton';


class MessageBefore extends Component {
  /**
   * Render the Modal
   */
  render() {
    const { onClose, onClick, message } = this.props;
    const modalFooter = (
      <div>
        <CancelButton text="Cancel" onClick={onClose} />
        <OkayButton text="Install" onClick={onClick} />
      </div>
    );

    return (
      <Modal title="Please Read Before Installing:" onClose={onClose} footer={modalFooter}>
        <MessageBody messageBody={message} />
      </Modal>
    );
  }
}

MessageBefore.propTypes = {
  /* Function to call when the modal is closed */
  onClose: PropTypes.func.isRequired,
  /* Function to call to show installation steps */
  onClick: PropTypes.func.isRequired,
  /* Message to display to user before they can install the app */
  message: PropTypes.string.isRequired,
};

export default MessageBefore;
