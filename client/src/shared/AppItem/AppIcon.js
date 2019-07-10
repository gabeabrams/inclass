import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppIcon.css';

class AppIcon extends Component {
  render() {
    // deconstruct props
    const { iconURL } = this.props;
    return (
      <img className="app-icon" src={iconURL} alt="app icon" />
    );
  }
}
AppIcon.propTypes = {
  // the url to the served icon
  iconURL: PropTypes.string.isRequired,
};
export default AppIcon;
