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
        className="btn btn-success btn-lg"
        onClick={onClick}
      >
        Uninstall
      </button>
    );
  }
}

UninstallButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default UninstallButton;
