import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppSubtitle extends Component {
  render() {
    // deconstruct props
    const { subtitle } = this.props;
    return (
      <div className="alert alert-warning">
        {subtitle}
      </div>
    );
  }
}
AppSubtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};
export default AppSubtitle;
