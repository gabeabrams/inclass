import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagFilter from './TagFilter';

// Import count generator helper
import genTagValueCounts from '../../utils/filter/genTagValueCounts';

// Import styling
import './style.css';

// The filter bar that contains all the tag cards
class Filters extends Component {
  render() {
    // Deconstruct props
    const {
      tags,
      apps,
      onFilterChanged,
    } = this.props;

    // Create the count object
    const countMapping = genTagValueCounts(apps, tags);

    const tagElements = Object.keys(tags).map((tagName) => {
      return (
        <div className="filters-elem">
          <TagFilter
            key={tagName}
            tags={tags}
            tagName={tagName}
            onFilterChanged={onFilterChanged}
            counts={countMapping}
          />
        </div>
      );
    });

    return (
      <div className="filters-container bg-secondary">
        {tagElements}
      </div>
    );
  }
}

Filters.propTypes = {
  // The tags object for filtering
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  // Filtered apps object to generate filter counts
  apps: PropTypes.objectOf(PropTypes.object).isRequired,
  // Handler for filtering by checkboxes and updating state
  onFilterChanged: PropTypes.func.isRequired,
};

export default Filters;
