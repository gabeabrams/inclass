import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './UninstallButton.css';

/**
 * Renders the uninstall button
 */
class UninstallButton extends Component {
  render() {
    // Deconstruct props
    const { onClick } = this.props;
    return (
      <button
        type="button"
        id="uninstall-button"
        className="btn btn-danger btn-lg font-weight-bold ml-1"
        onClick={onClick}
      >
        Uninstall
      </button>
    );
  }
}

UninstallButton.propTypes = {
  // Function that uninstalls the app
  onClick: PropTypes.func.isRequired,
};

export default UninstallButton;
