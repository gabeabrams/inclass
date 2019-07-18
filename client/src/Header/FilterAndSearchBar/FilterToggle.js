import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './FilterToggle.css';

class FilterToggle extends Component {
  render() {
    return (
      <div className="filtertoggle-container">
        <span className="text-white font-weight-bold">Filters</span>
        <span className="text-white font-weight-bold ml-1">& Tags</span>
        <span className="ml-1">Hi</span>
      </div>
    );
  }
}

export default FilterToggle;
