import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SupportButton extends Component {
  render() {
    // Deconstruct props
    const { handleClick } = this.props;
    return (
      // message: Install
      <button
        type="button"
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
