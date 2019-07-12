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
      <div className="row titlebar-container no-gutters">
        <div className="col titlebar-left text-right">
          <StoreTitle storeTitle={storeTitle} />
        </div>
        <div className="col titlebar-right text-left">
          <CatalogTitle catalogTitle={catalogTitle} />
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  storeTitle: PropTypes.string.isRequired,
  catalogTitle: PropTypes.string.isRequired,
};

export default TitleBar;
