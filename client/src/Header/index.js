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
      searchQuery,
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

        />
      </div>
    );
  }
}

Header.propTypes = {
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  storeTitle: PropTypes.string.isRequired,
  catalogTitle: PropTypes.string.isRequired,
  filterDrawerOpen: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Header;
