import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InstallButton extends Component {
  render() {
    // Deconstruct props
    const { handleClick } = this.props;
    return (
      // message: Install
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={handleClick}
      >
      Install
      </button>
    );
  }
}

InstallButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default InstallButton;
