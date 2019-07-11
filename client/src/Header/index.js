import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Logo from './Logo';
import TitleBar from './TitleBar';

class Header extends Component {
  render() {
    // Deconstruct props
    const {
      storeHost,
      storeTitle,
      catalogTitle,
    } = this.props;

    return (
      <div
        className="bg-info w-100 h-100"
        style={{
          padding: '10px',
        }}
      >
        <TitleBar
          storeTitle="Harvard"
          catalogTitle="Catalog"
        />
        <Logo url={`https://${storeHost}/public/logo`} />
      </div>
    );
  }
}

Header.propTypes = {
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  storeTitle: PropTypes.string.isRequired,
  catalogTitle: PropTypes.string.isRequired,
};

export default Header;
