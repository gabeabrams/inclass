import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logo extends Component {
  render() {
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
  url: PropTypes.string,
};

Logo.defaultProps = {
  // TODO: pick default url
  url: '',
};

export default Logo;
