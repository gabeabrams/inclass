import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UninstallButton extends Component {
  render() {
    // Deconstruct props
    const { onClick } = this.props;
    return (
      <button
        type="button"
        id="uninstall-button"
        style={{
          fontSize: '25px',
        }}
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
