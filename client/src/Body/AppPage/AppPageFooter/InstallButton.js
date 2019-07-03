import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InstallButton extends Component {
  render() {
    // Deconstruct props
    const { onClicked } = this.props;
    return (
      // message: Install
      <button type="button" className="btn btn-default" onClick={onClicked}>Install</button>
    );
  }
}

InstallButton.propTypes = {
  onClicked: PropTypes.func.isRequired,
};

export default InstallButton;
