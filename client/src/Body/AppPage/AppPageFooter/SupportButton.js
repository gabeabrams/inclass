import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SupportButton extends Component {
  render() {
    // Deconstruct props
    const { onClicked } = this.props;
    return (
      // message: Install
      <button
        type="button"
        className="btn btn-light btn-lg"
        onClick={onClicked}
      >
      Get Support
      </button>
    );
  }
}

SupportButton.propTypes = {
  onClicked: PropTypes.func.isRequired,
};

export default SupportButton;
