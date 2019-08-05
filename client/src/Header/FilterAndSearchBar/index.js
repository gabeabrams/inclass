import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import FilterToggle from './FilterToggle';
import SearchField from './SearchField';
import Filters from './Filters';

// Import css
import './style.css';

class FilterAndSearchBar extends Component {
  render() {
    // Deconstruct what we'll need from Header
    const {
      filterDrawerOpen,
      onFilterToggle,
      searchQuery,
      onSearchChanged,
      tags,
    } = this.props;

    // Divided into FilterToggle component and SearchField component
    return (
      <div className="filterandsearchbar-container bg-secondary row no-gutters">
        <div className="col filterandsearchbar-filterbutton text-right">
          <FilterToggle
            filterDrawerOpen={filterDrawerOpen}
            onFilterToggle={onFilterToggle}
          />
        </div>
        <div className="col filterandsearchbar-searchbox text-left">
          <SearchField
            searchQuery={searchQuery}
            onSearchChanged={onSearchChanged}
          />
        </div>
      </div>
    );
  }
}

FilterAndSearchBar.propTypes = {
  // Whether the filterDrawer should be open or not
  filterDrawerOpen: PropTypes.bool.isRequired,
  // The handler for toggling the filter drawer and setting state
  onFilterToggle: PropTypes.func.isRequired,
  // The text query in the search box
  searchQuery: PropTypes.string.isRequired,
  // The function to update the search query
  onSearchChanged: PropTypes.func.isRequired,
};

export default FilterAndSearchBar;
