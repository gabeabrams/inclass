import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SupportButton extends Component {
  render() {
    // Deconstruct props
    const { onClick } = this.props;
    return (
      // message: Get Support
      <button
        type="button"
        id="support-button"
        style={{
          fontSize: '25px',
        }}
        className="btn btn-light btn-lg"
        onClick={onClick}
      >
        Get Support
      </button>
    );
  }
}

SupportButton.propTypes = {
  // Function used when support button is clicked
  onClick: PropTypes.func.isRequired,
};

export default SupportButton;
