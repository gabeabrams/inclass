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
    } = this.props;

    return (
      <div className="filterandsearchbar-container bg-secondary row no-gutters">
        <div className="col filterandsearchbar-filterbutton">
          <FilterToggle filterDrawerOpen={filterDrawerOpen} />
        </div>
        <div className="col filterandsearchbar-searchbox" />
      </div>
    );
  }
}

FilterAndSearchBar.propTypes = {
  // Whether the filterDrawer should be open or not
  filterDrawerOpen: PropTypes.bool,
};

FilterAndSearchBar.defaultProps = {
  // By default, filter drawer is closed
  filterDrawerOpen: false,
};

export default FilterAndSearchBar;
