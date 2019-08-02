import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Logo from './Logo';
import TitleBar from './TitleBar';
import FilterAndSearchBar from './FilterAndSearchBar';

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
    } = this.props;

    return (
      <div>
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
        />
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
};

export default Header;
