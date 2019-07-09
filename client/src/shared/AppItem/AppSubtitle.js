import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppSubtitle.css';

class AppSubtitle extends Component {
  render() {
    // deconstruct props
    const { subtitle } = this.props;
    return (
      <div className="app-subtitle">
        {subtitle}
      </div>
    );
  }
}
AppSubtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};
export default AppSubtitle;
