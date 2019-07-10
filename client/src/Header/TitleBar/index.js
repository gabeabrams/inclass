import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import StoreTitle from './StoreTitle';
import CatalogTitle from './CatalogTitle';

// Import stylesheet
import './style.css';

class TitleBar extends Component {
  render() {
    // Deconstruct any props needed by titlebar or its children
    const {
      storeTitle,
      catalogTitle,
    } = this.props;

    return (
      <div
        className=titlebar
      >
        <StoreTitle storeTitle=storeTitle>
        <CatalogTitle catalogTitle=catalogTitle>
      </div>

    );
  }
}

TitleBar.propTypes = {
  storeTitle: PropTypes.string.isRequired,
  catalogTitle: PropTypes.string.isRequired,
}
