import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import FilterToggle from './FilterToggle';
import SearchField from './SearchField';

// Import css
import './style.css';

class FilterAndSearchBar extends Component {
  render() {
    // Deconstruct what we'll need from Header

    return (
      <div className="filterandsearchbar-container bg-secondary row no-gutters">
        <div className="col filterandsearchbar-filterbutton">
          <FilterToggle />
        </div>
        <div className="col filterandsearchbar-searchbox" />
      </div>
    );
  }
}

export default FilterAndSearchBar;
