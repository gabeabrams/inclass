import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './SearchField.css';

class SearchField extends Component {
  render() {
    const {
      searchQuery,
      onSearchChanged,
    } = this.props;

    // Use input field to type into search
    return (
      <div className="searchfield-container">
        <div className="input-group">
          <input
            id="searchfield-input"
            type="text"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => {
              onSearchChanged(e.target.value);
            }}
            className="form-control"
            aria-label="Search"
          />
        </div>
      </div>
    );
  }
}

SearchField.propTypes = {
  // The query that is stored in the AppStore state
  searchQuery: PropTypes.string.isRequired,
  // The function to update the search query in the appstore's state
  onSearchChanged: PropTypes.func.isRequired,
};

export default SearchField;
