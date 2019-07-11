import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InstallButton extends Component {
  render() {
    // Deconstruct props
    const { onClick } = this.props;
    return (
      // message: Install
      <button
        type="button"
        id="install-button"
        className="btn btn-success btn-lg"
        onClick={onClick}
      >
      Install
      </button>
    );
  }
}

InstallButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default InstallButton;
