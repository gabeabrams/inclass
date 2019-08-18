import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Logo from './Logo';
import TitleBar from './TitleBar';
import FilterAndSearchBar from './FilterAndSearchBar';
import Filters from './FilterAndSearchBar/Filters';

// Import css
import './style.css';

class Header extends Component {
  render() {
    // Deconstruct props
    const {
      storeHost,
      storeTitle,
      catalogTitle,
      filterDrawerOpen,
      onFilterToggle,
      searchQuery,
      onSearchChanged,
      tags,
      currentBodyType,
      onBackButtonClicked,
    } = this.props;

    // Only toggle the Filters component if filterDrawerOpen
    let filters;

    if (filterDrawerOpen) {
      filters = (
        <div className="filters-container bg-secondary">
          <Filters tags={tags} />
        </div>
      );
    }

    return (
      <div className="header-container">
        <div className="header-container">
          <Logo url={`https://${storeHost}/public/logo`} />
          <TitleBar
            storeTitle={storeTitle}
            catalogTitle={catalogTitle}
          />
          <FilterAndSearchBar
            filterDrawerOpen={filterDrawerOpen}
            onFilterToggle={onFilterToggle}
            searchQuery={searchQuery}
            onSearchChanged={onSearchChanged}
            currentBodyType={currentBodyType}
            onBackButtonClicked={onBackButtonClicked}
          />
        </div>
        {filters}
      </div>
    );
  }
}

Header.propTypes = {
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  // The title of the store
  storeTitle: PropTypes.string.isRequired,
  // The title of the catalog
  catalogTitle: PropTypes.string.isRequired,
  // Bool for whether the filter drawer is open
  filterDrawerOpen: PropTypes.bool.isRequired,
  // The handler for toggling the filter drawer and setting state
  onFilterToggle: PropTypes.func.isRequired,
  // Query entered into the search bar
  searchQuery: PropTypes.string.isRequired,
  // Function to update the text in searchfield
  onSearchChanged: PropTypes.func.isRequired,
  // The tags object for filtering
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  // The current page displayed (app list or app page)
  currentBodyType: PropTypes.string.isRequired,
  // Goes back to App list when button clicked
  onBackButtonClicked: PropTypes.func.isRequired,
};

export default Header;
