import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OkayButton extends Component {
  render() {
    const { text, onClick } = this.props;

    return (
      <button
        type="button"
        className="btn btn-info okay-button border-0 rounded text-white font-weight-bold ml-1"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

OkayButton.propTypes = {
  // the text display on the botton
  text: PropTypes.string.isRequired,
  // the onClick function to close down the modal
  onClick: PropTypes.func.isRequired,
};

export default OkayButton;
