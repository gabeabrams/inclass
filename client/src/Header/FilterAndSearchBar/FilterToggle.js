import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'


// Import css
import './FilterToggle.css';

class FilterToggle extends Component {
  render() {
    return (
      <div className="filtertoggle-container">
        <span className="text-white font-weight-bold">Filters</span>
        <span className="text-white font-weight-bold ml-1">& Tags</span>
        <FontAwesomeIcon icon={faCaretRight} size="2x" className="ml-3" />
      </div>
    );
  }
}

export default FilterToggle;
