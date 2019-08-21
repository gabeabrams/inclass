import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styling
import './TagFilterResetButton.css';

class TagFilterResetButton extends Component {
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div className="tagfilterresetbutton-container">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-secondary tagfilterresetbutton-button"
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
};

export default TagFilterResetButton;
