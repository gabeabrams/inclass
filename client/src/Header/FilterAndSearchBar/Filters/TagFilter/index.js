import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components

// Import css

class TagFilter extends Component {
  render() {
    const {
      tag,
    } = this.props;

    return (
      <div>
        {tag}
      </div>
    );
  }
}

TagFilter.propTypes = {
  tag: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TagFilter;
