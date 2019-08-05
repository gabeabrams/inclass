import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CancelButton extends Component {
  render() {
    const { text, onClick } = this.props;
    return (
      <button
        type="button"
        className="btn btn-secondary border-0 cancel-button text-white font-weight-bold ml-2"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

CancelButton.propTypes = {
  // the text display on the botton
  text: PropTypes.string,
  // the onClick function to close down the modal
  onClick: PropTypes.func.isRequired,
};

CancelButton.defaultProps = {
  // default text is okay
  text: 'Cancel',
};

export default CancelButton;
