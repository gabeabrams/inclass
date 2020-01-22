import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './TagValueFilterCheckBox.css';

class TagValueFilterCheckBox extends Component {
  render() {
    const {
      tagName,
      isChecked,
      label,
      onClick,
    } = this.props;

    // Make individual checkbox id based on tagValue name (label)
    const idName = `filter-checkbox-${tagName}-${label}`;

    return (
      <div className="tagvaluefiltercheckbox-container">
        <div className="tagvaluefiltercheckbox-checkbox">
          <input
            type="checkbox"
            checked={isChecked}
            id={idName}
            onChange={onClick}
          />
        </div>
        <div className="tagvaluefiltercheckbox-label">
          <label
            className="form-check-label"
            htmlFor={idName}
          >
            {label}
          </label>
        </div>
      </div>
    );
  }
}

TagValueFilterCheckBox.propTypes = {
  // The name of the tag
  tagName: PropTypes.string.isRequired,
  // Whether the checkbox should be clicked or not
  isChecked: PropTypes.bool.isRequired,
  // The label of the tagValue to render
  label: PropTypes.string.isRequired,
  // Handler to update state and filter when checkbox is clicked
  onClick: PropTypes.func.isRequired,
};

export default TagValueFilterCheckBox;
