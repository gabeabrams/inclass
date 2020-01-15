// Import React
import React, { Component } from 'react';
import Modal from '..';

class SpinnerModal extends Component {
  /**
   * Render the Modal
   */
  render() {
    return (
      <Modal
        title="Just a moment..."
        noX
      >
        <p className="lead m-0">
          We&apos;re waiting for Canvas.
        </p>
      </Modal>
    );
  }
}

export default SpinnerModal;
