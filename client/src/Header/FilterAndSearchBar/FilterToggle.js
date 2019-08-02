import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Import css
import './FilterToggle.css';

class FilterToggle extends Component {
  render() {
    // Deconstruct props
    const {
      filterDrawerOpen,
      onFilterToggle,
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
        <span className="text-white text-nowrap font-weight-bold">Filters</span>
        <span className="text-white text-nowrap font-weight-bold ml-1 d-none d-sm-block">& Tags</span>
        <button
          type="button"
          className="btn btn-inline btn-lg btn-outline-secondary h-100 p-0"
          onClick={() => {
            onFilterToggle(!filterDrawerOpen);
          }}
        >
          {caretElem}
        </button>
      </div>
    );
  }
}

FilterToggle.propTypes = {
  // Whether the filterDrawer should be open or not
  filterDrawerOpen: PropTypes.bool.isRequired,
  // The handler for toggling the filter drawer and setting state
  onFilterToggle: PropTypes.func.isRequired,
};

export default FilterToggle;
