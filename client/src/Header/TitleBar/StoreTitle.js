import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './StoreTitle.css';

class StoreTitle extends Component {
  render() {
    // Deconstruct props
    const {
      storeTitle,
    } = this.props;

    return (
      <div className="storetitle-container row no-gutters">
        <div className="col"><b>{ storeTitle }</b></div>
        <div className="storetitle-storetext d-none d-sm-block col-{breakpoint}-auto">App Store</div>
      </div>
    );
  }
}

StoreTitle.propTypes = {
  storeTitle: PropTypes.string.isRequired,
};

export default StoreTitle;
