import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CancelButton extends Component {
  render() {
    const { text, onClose } = this.props;
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onClose}
      >
        {text}
      </button>
    );
  }
}

CancelButton.propTypes = {
  // the text display on the botton
  text: PropTypes.string.isRequired,
  // the onclose function to close down the modal
  onClose: PropTypes.func.isRequired,
};

export default CancelButton;
