import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import StoreTitle from './StoreTitle';

// Import stylesheet
import './style.css';

class TitleBar extends Component {
  render() {
    // Deconstruct any props needed by titlebar or its children
    const {
      storeTitle,
    } = this.props;

    return (
      <div
        className="titlebar"
      >
        <StoreTitle storeTitle={storeTitle} />
      </div>
    );
  }
}

TitleBar.propTypes = {
  storeTitle: PropTypes.string.isRequired,
}

export default TitleBar;
