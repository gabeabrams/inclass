import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogTitle extends Component {
  render() {
    // Deconstruct props
    const {
      catalogTitle,
    } = this.props;

    return (
      <div>
        <b>{ catalogTitle }</b>
        {' Catalog'}
      </div>
    );
  }
}

CatalogTitle.propTypes = {
  catalogTitle: PropTypes.string.isRequired,
};

export default CatalogTitle;
