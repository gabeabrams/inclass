import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UninstallButton extends Component {
  render() {
    // Deconstruct props
    const { onClicked } = this.props;
    return (
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={(e) => {
          this.handleClick(e);
        }}
      >
        Uninstall
      </button>
    );
  }
}

UninstallButton.propTypes = {
  onClicked: PropTypes.func.isRequired,
};

export default UninstallButton;
