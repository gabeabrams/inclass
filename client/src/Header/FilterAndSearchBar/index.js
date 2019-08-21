import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import FilterToggle from './FilterToggle';
import SearchField from './SearchField';
import BackToAppListButton from '../BackToAppListButton';

// Import body types
import BODY_TYPE from '../../Body/BODY_TYPE';

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
      currentBodyType,
      onBackButtonClicked,
    } = this.props;

    let filterToggleElem;
    let backButtonElem;

    // If in app page display back button to app list
    if (currentBodyType === BODY_TYPE.APP_LIST) {
      filterToggleElem = (
        <FilterToggle
          filterDrawerOpen={filterDrawerOpen}
          onFilterToggle={onFilterToggle}
        />
      );
    } else {
      backButtonElem = (
        <BackToAppListButton onBackButtonClicked={onBackButtonClicked} />
      );
    }
    // Divided into FilterToggle component and SearchField component
    return (
      <div className="filterandsearchbar-container bg-secondary row no-gutters">
        <div className="col filterandsearchbar-filterbutton text-right">
          {filterToggleElem}
          {backButtonElem}
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
  // The current page displayed (app list or app page)
  currentBodyType: PropTypes.string.isRequired,
  // Function that goes to app list page when clicked
  onBackButtonClicked: PropTypes.func.isRequired,
};

export default FilterAndSearchBar;
