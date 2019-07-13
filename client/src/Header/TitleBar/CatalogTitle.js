import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './CatalogTitle.css';

class CatalogTitle extends Component {
  render() {
    // Deconstruct props
    const {
      catalogTitle,
    } = this.props;

    return (
      <div className="catalogtitle-container row no-gutters">
        {/* Used col-{breakpoint}-auto to make column fit to content */}
        <div className="col-{breakpoint}-auto"><b>{ catalogTitle }</b></div>
        <div className="catalogtitle-catalogtext d-none d-sm-block col">Catalog</div>
      </div>
    );
  }
}

CatalogTitle.propTypes = {
  catalogTitle: PropTypes.string.isRequired,
};

export default CatalogTitle;
