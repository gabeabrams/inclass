import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    // Return the button
    return (
      <div className="filtertoggle-container">
        <button
          type="button"
          id="filtertoggle-button"
          className="btn btn-outline-secondary p-0"
          onClick={() => {
            onFilterToggle(!filterDrawerOpen);
          }}
        >
          <div className="filtertoggle-container">
            <span className="text-white text-nowrap font-weight-bold">Filters</span>
            <span className="text-white text-nowrap font-weight-bold ml-1 d-none d-sm-block">& Tags</span>
            <div className="button-container ml-3">
              {/* If filter drawer is open, caret will face down; closed, caret
                will face right */}
              <FontAwesomeIcon
                icon={filterDrawerOpen ? faCaretDown : faCaretRight}
              />
            </div>
          </div>
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
