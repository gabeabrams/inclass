import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styling
import './TagFilterResetButton.css';

class TagFilterResetButton extends Component {
  render() {
    const {
      onClick,
      tagName,
    } = this.props;

    // Make unique id name
    const idName = `reset-button-${tagName}`;

    return (
      <div className="tagfilterresetbutton-container">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-secondary tagfilterresetbutton-button"
          id={idName}
        >
          Reset
        </button>
      </div>
    );
  }
}

TagFilterResetButton.propTypes = {
  // The handler for resetting all filters
  onClick: PropTypes.func.isRequired,
  // The tagName for this reset button - for unique id purposes
  tagName: PropTypes.string.isRequired,
};

export default TagFilterResetButton;
