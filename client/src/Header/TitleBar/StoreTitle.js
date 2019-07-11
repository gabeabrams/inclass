import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StoreTitle extends Component {
  render() {
    // Deconstruct props
    const {
      storeTitle,
    } = this.props;

    return (
      <div
        style={{
          height: '50px',
        }}
      >
        { storeTitle }
      </div>
    );
  }
}

StoreTitle.propTypes = {
  storeTitle: PropTypes.string.isRequired,
};

export default StoreTitle;
