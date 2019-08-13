import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Other components

// Import css

class TagValueFilterCheckBox extends Component {
  render() {
    const {
      isChecked,
      label,
    } = this.props;

    return (
      <span className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
        <label className="form-check-label" for="defaultCheck1">
          {label}
        </label>
      </span>
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
