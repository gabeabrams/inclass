import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './style.css';

class FilterAndSearchBar extends Component {
  render() {
    // Deconstruct what we'll need from Header
    const {

    } = this.props;

    return (
      <div className="filterandsearchbar-container row no-gutters">
        <div className="col filterandsearchbar-filterbutton"></div>
        <div className="col filterandsearchbar-searchbox"></div>
      </div>
    );
  }
}
