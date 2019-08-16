import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import css
import './TagValueFilterCheckBox.css';

class TagValueFilterCheckBox extends Component {
  render() {
    const {
      isChecked,
      label,
    } = this.props;

    // Make individual checkbox id based on tagValue name (label)
    const idName = `defaultCheck${label}`;

    return (
      <div className="form-check tagvaluefiltercheckbox-container">
        <input className="form-check-input" type="checkbox" value="" id={idName} />
        <label
          className="form-check-label tagvaluefiltercheckbox-label"
          for={idName}
        >
          {label}
        </label>
      </div>
    );
  }
}

TagValueFilterCheckBox.propTypes = {
  // Whether the checkbox should be clicked or not
  isChecked: PropTypes.bool.isRequired,
  // The label of the tagValue to render
  label: PropTypes.string.isRequired,
};

export default TagValueFilterCheckBox;
