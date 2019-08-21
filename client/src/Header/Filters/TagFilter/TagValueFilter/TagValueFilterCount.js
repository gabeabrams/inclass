import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styling
import './TagValueFilterCount.css';

class TagValueFilterCount extends Component {
  render() {
    const {
      count,
    } = this.props;

    // Make new string for count
    const appCount = `(${count})`;

    return (
      <div className="tagvaluefiltercount-container">
        {appCount}
      </div>
    );
  }
}

TagValueFilterCount.propTypes = {
  // Count of apps that match search for this tagValue
  count: PropTypes.number.isRequired,
};

export default TagValueFilterCount;
