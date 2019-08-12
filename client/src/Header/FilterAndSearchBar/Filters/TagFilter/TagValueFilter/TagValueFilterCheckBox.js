import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Other components

// Import css

class TagValueFilterCheckBox extends Component {
  render() {
    const {
      isChecked,
    } = this.props;

    return (
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
        <label className="form-check-label" for="defaultCheck1">
        Default checkbox
        </label>
      </div>
    );
  }
}

TagValueFilterCheckBox.propTypes = {
  // Whether the checkbox should be clicked or not
  isChecked: PropTypes.bool.isRequired,
};

export default TagValueFilterCheckBox;
