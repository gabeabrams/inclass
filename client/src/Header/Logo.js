// Import React and Component from react package
import React, { Component } from 'react';

// Import PropTypes package
import PropTypes from 'prop-types';

// Import css
import './Logo.css';

class Logo extends Component {
  render() {
    // Deconstruct props
    const {
      url,
    } = this.props;

    return (
      <div className="logo-container">
        <img
          className="logo-image"
          src={url}
          alt="App Store Logo"
        />
      </div>
    );
  }
}

Logo.propTypes = {
  url: PropTypes.string.isRequired,
};


export default Logo;
