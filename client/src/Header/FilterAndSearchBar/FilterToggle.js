import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './FilterToggle.css';

class FilterToggle extends Component {
  render() {
    return (
      <div className="filtertoggle-container row no-gutters">
        <div className="filtertoggle-filter col">Filters</div>
        <div className="filtertoggle-tags col">& Tags</div>
      </div>
    );
  }
}

export default FilterToggle;
