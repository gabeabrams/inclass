import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AppSubtitle.css';

class AppSubtitle extends Component {
  render() {
    // deconstruct props
    const { subtitle } = this.props;
    return (
      <div className="app-subtitle">
        <p className="lead m-0">
          {subtitle}
        </p>
      </div>
    );
  }
}

AppSubtitle.propTypes = {
  // a short description of the app
  subtitle: PropTypes.string.isRequired,
};

export default AppSubtitle;
