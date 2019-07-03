// Import React and Component from react package
import React, { Component } from 'react';

// Import PropTypes package
import PropTypes from 'prop-types';

class Logo extends Component {
  render() {
    // Deconstruct props
    const {
      url,
    } = this.props;
    return (
      <span
        style={{
          height: '120px',
        }}
      />
    );
  }
}

Logo.propTypes = {
  url: PropTypes.string.isRequired,
};


export default Logo;
