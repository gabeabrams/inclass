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
    const {
      filterDrawerOpen,
      searchQuery,
      onSearchChanged,
    } = this.props;

    return (
      <div className="filterandsearchbar-container bg-secondary row no-gutters">
        <div className="col filterandsearchbar-filterbutton text-right">
          <FilterToggle filterDrawerOpen={filterDrawerOpen} />
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
  // The text query in the search box
  searchQuery: PropTypes.string.isRequired,
  // The function to update the search query
  onSearchChanged: PropTypes.func.isRequired,
};

export default FilterAndSearchBar;
