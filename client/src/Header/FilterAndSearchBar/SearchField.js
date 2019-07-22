import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Import css
import './SearchField.css';

class SearchField extends Component {
  render() {
    const {
      searchQuery,
    } = this.props;

    return (
      <div>
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
      </div>
    );
  }
}

SearchField.propTypes = {
  // The query that is stored in the AppStore state
  searchQuery: PropTypes.string.isRequired,
};

export default SearchField;
