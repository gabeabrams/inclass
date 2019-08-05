import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './CatalogTitle.css';

class CatalogTitle extends Component {
  render() {
    // Deconstruct props
    const {
      // The title of the catalog
      catalogTitle,
    } = this.props;

    return (
      <div className="catalogtitle-container">
        <span className="catalogtitle-title font-weight-bold mr-1">
          {catalogTitle}
        </span>
        <span className="catalogtitle-catalogtext d-none d-sm-inline">
          Catalog
        </span>
      </div>
    );
  }
}

CatalogTitle.propTypes = {
  // catalogTitle is a string and is required
  catalogTitle: PropTypes.string.isRequired,
};

export default CatalogTitle;
