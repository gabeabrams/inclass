import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SupportButton extends Component {
  render() {
    // Deconstruct props
    const { handleClick } = this.props;
    return (
      // message: Support
      <button
        type="button"
        id="support-button"
        className="btn btn-light btn-lg"
        onClick={handleClick}
      >
      Get Support
      </button>
    );
  }
}

SupportButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SupportButton;
