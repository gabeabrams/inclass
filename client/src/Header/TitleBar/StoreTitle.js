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
      <div>
        <b>{ storeTitle }</b>
        {' App Store'}
      </div>
    );
  }
}

StoreTitle.propTypes = {
  storeTitle: PropTypes.string.isRequired,
};

export default StoreTitle;
