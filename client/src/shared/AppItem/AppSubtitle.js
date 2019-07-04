import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppSubtitle extends Component {
  render() {
    // deconstruct props
    const { subTitle } = this.props;
    return (
      <div className="alert alert-warning">
        {subTitle}
      </div>
    );
  }
}
AppSubtitle.propTypes = {
  subTitle: PropTypes.string.isRequired,
};
export default AppSubtitle;
