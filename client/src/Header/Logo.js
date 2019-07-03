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
      <span>
        <img
          className="logo"
          source={url}
          alt="App Store logo"
        />
      </span>
    );
  }
}

Logo.propTypes = {
  url: PropTypes.string.isRequired,
};


export default Logo;
