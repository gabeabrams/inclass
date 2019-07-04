import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppIcon extends Component {
  render() {
    // deconstruct props
    const { iconURL } = this.props;
    return (
      <img src={iconURL} alt="app icon" />
    );
  }
}
AppIcon.propTypes = {
  iconURL: PropTypes.string.isRequired,
};
export default AppIcon;
