import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppTitle.css';

class AppTitle extends Component {
  render() {
    // deconstruct props
    const { title } = this.props;
    return (
      <div className="app-title">
        {title}
      </div>
    );
  }
}
AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default AppTitle;
