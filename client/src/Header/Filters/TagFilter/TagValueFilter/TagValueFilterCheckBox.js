import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './TagValueFilterCheckBox.css';

class TagValueFilterCheckBox extends Component {
  render() {
    const {
      isChecked,
      label,
      onClick,
    } = this.props;

    // Make individual checkbox id based on tagValue name (label)
    const idName = `defaultCheck${label}`;

    return (
      <div className="form-check tagvaluefiltercheckbox-container">
        <div className="tagvaluefiltercheckbox-checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isChecked}
            id={idName}
            onClick={onClick}
          />
        </div>
        <div className="tagvaluefiltercheckbox-label">
          <label
            className="form-check-label"
            for={idName}
          >
            {label}
          </label>
        </div>
      </div>
    );
  }
}

TagValueFilterCheckBox.propTypes = {
  // Whether the checkbox should be clicked or not
  isChecked: PropTypes.bool.isRequired,
  // The label of the tagValue to render
  label: PropTypes.string.isRequired,
  // Handler to update state and filter when checkbox is clicked
  onClick: PropTypes.func.isRequired,
};

export default TagValueFilterCheckBox;
