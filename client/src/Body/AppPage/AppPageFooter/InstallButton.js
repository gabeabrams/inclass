import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InstallButton extends Component {
  render() {
    return (
      // message: Install
      <button type="button" class="btn btn-default" onClick={this.props.handleClick}>Install</button>
    );
  }
}

InstallButton.propTypes = {
  onClicked: // function,
};

export default InstallButton;
