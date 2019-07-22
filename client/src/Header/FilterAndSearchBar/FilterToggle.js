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

    let caretElem;

    if (!filterDrawerOpen) {
      caretElem = (
        <FontAwesomeIcon icon={faCaretRight} size="2x" className="ml-3" />
      );
    } else {
      caretElem = (
        <FontAwesomeIcon icon={faCaretDown} size="2x" className="ml-3" />
      );
    }

    // Turn into a button
    // Write style class to remove all the button properties
    // Write function in AppStore.js to pass down (eventually)

    return (
      <div className="filtertoggle-container">
        <span className="text-white font-weight-bold">Filters</span>
        <span className="text-white font-weight-bold ml-1">& Tags</span>
        {caretElem}
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
