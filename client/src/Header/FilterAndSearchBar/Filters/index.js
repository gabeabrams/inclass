import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagFilter from './TagFilter';

// Import css


// The filter bar that contains all the tag cards
class Filters extends Component {
  render() {
    // Deconstruct props
    const {
      tags,
    } = this.props;

    const tagElements = Object.keys(tags).map((tagName) => {
      return (
        <TagFilter tag={tagName} />
      );
    });

    return (
      <div>
        {tagElements}
      </div>
    );
  }
}

Filters.propTypes = {
  // The tags object for filtering
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Filters;
