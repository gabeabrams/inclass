import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Import css
import './SearchField.css';

class SearchField extends Component {
  render() {
    const {
      searchQuery,
    } = this.props;

    return (
      <div className="searchfield-container">
        <div className="input-group">
          <div className="input-group-prepend ">
            <button
              className="btn input-group-text d-none d-sm-block ml-2"
              type="button"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={searchQuery}
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    );
  }
}

SearchField.propTypes = {
  // The query that is stored in the AppStore state
  searchQuery: PropTypes.string.isRequired,
};

export default SearchField;
