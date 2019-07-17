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
      <div className="storetitle-container row no-gutters">
        {/* Use bootstrap row for titlebar, and columns
          for store and catalog titles */}
        <div className="col"><b>{ storeTitle }</b></div>
        <div className="storetitle-storetext d-none d-sm-block col-{breakpoint}-auto">App Store</div>
      </div>
    );
  }
}

StoreTitle.propTypes = {
  // storeTitle prop must be a string and is required
  storeTitle: PropTypes.string.isRequired,
};

export default StoreTitle;
