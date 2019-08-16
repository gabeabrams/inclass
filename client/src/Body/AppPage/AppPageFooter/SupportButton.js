import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SupportButton.css';

class SupportButton extends Component {
  render() {
    // Deconstruct props
    const { onClick } = this.props;
    return (
      // message: Get Support
      <button
        type="button"
        id="support-button"
        className="support-button btn btn-light btn-lg ml-1"
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
