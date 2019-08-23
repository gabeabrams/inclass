// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '..';
import OkayButton from '../../shared/OkayButton';
import CancelButton from '../../shared/CancelButton';
import MessageBody from './MessageBody';

class MessageBefore extends Component {
  /**
   * Render the Modal
   */
  render() {
    // deconstruct the props
    const {
      onClose,
      onClick,
      message,
      uninstalling,
    } = this.props;

    // MessageBefore modal requires cancel button and okay button as footers
    const modalFooter = (
      <div>
        <CancelButton text="Cancel" onClick={onClose} />
        <OkayButton
          text={(uninstalling) ? 'Uninstall' : 'Install'}
          onClick={onClick}
        />
      </div>
    );
    // Modal title is different depending on installing or uninstalling
    const modalTitle = `Please Read Before ${(uninstalling) ? 'Uninstalling' : 'Installing'}`;

    return (
      <div className="message-before-modal">
        <Modal
          title={modalTitle}
          onClose={onClose}
          footer={modalFooter}
          titleBackgroundColor="#87CEFA"
        >
          <MessageBody messageBody={message} />
        </Modal>
      </div>
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
  /* Install boolean to determine use for install or uninstall */
  uninstalling: PropTypes.bool,
};

MessageBefore.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default MessageBefore;
