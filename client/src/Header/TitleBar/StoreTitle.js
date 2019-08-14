import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './StoreTitle.css';

class StoreTitle extends Component {
  render() {
    const {
      // The title of the store
      storeTitle,
    } = this.props;

    return (
      <div className="storetitle-container">
        <span className="storetitle-title font-weight-bold">
          {storeTitle}
        </span>
        <span className="storetitle-text ml-1 d-none d-sm-inline">
          App Store
        </span>
      </div>
    );
  }
}

StoreTitle.propTypes = {
  // storeTitle prop must be a string and is required
  storeTitle: PropTypes.string.isRequired,
};

export default StoreTitle;
