import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


// Import css
import './FilterToggle.css';

class FilterToggle extends Component {
  render() {
    // Deconstruct props
    const {
      filterDrawerOpen,
    } = this.props;

    // Create caret icon element
    let caretElem;

    // If the filter drawer is closed, caret will face right, if it is open,
    // caret will face down
    if (!filterDrawerOpen) {
      caretElem = (
        <FontAwesomeIcon icon={faCaretRight} className="ml-3" />
      );
    } else {
      caretElem = (
        <FontAwesomeIcon icon={faCaretDown} className="ml-3" />
      );
    }

    // Turn into a button
    // Write style class to remove all the button properties
    // Write function in AppStore.js to pass down (eventually)

    return (
      <div className="filtertoggle-container">
        <button type="button">
          <span className="text-white font-weight-bold">Filters</span>
          <span className="text-white font-weight-bold ml-1">& Tags</span>
          {caretElem}
        </button>
      </div>
    );
  }
}

FilterToggle.propTypes = {
  // Whether the filterDrawer should be open or not
  filterDrawerOpen: PropTypes.bool,
};

FilterToggle.defaultProps = {
  // By default, filter drawer is closed
  filterDrawerOpen: false,
};


export default FilterToggle;
