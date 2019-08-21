import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppIcon.css';

class AppIcon extends Component {
  render() {
    // deconstruct props
    const { appTitle, iconURL } = this.props;
    return (
      <div className="mr-3">
        <img
          className="app-icon"
          src={iconURL}
          alt={`${appTitle} icon`}
        />
      </div>
    );
  }
}

AppIcon.propTypes = {
  // title of the app
  appTitle: PropTypes.string.isRequired,
  // the url to the served icon
  iconURL: PropTypes.string.isRequired,
};

export default AppIcon;
