import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UninstallButton extends Component {
  render() {
    // Deconstruct props
    const { handleClick } = this.props;
    return (
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={handleClick}
      >
        Uninstall
      </button>
    );
  }
}

UninstallButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default UninstallButton;
