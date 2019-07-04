import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppTitle extends Component {
  render() {
    // deconstruct props
    const { title } = this.props;
    return (
      <div className="alert alert-warning">
        {title}
      </div>
    );
  }
}
AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default AppTitle;
