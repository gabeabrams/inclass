import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SupportButton extends Component {
  render() {
    const { text, onClick } = this.props;

    return (
      <button
        type="button"
        className="btn btn-secondary support-button border-0 rounded text-white font-weight-bold ml-1"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

SupportButton.propTypes = {
  // the text display on the botton
  text: PropTypes.string,
  // the onClick function to close down the modal
  onClick: PropTypes.func.isRequired,
};

SupportButton.defaultProps = {
  // default text is okay
  text: 'Contact Support',
};

export default SupportButton;
