import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logo extends Component {
  render() {
    return (
      <span>
        No logo yet
      </span>
    );
  }
}

Logo.propTypes = {
  url: PropTypes.string,
};

Logo.defaultProps = {
};

export default Logo;
