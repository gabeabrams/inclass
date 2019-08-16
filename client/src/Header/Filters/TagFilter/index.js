import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilter from './TagValueFilter';

// Import css
import './style.css';

class TagFilter extends Component {
  render() {
    const {
      tags,
      tagName,
      onFilterChanged,
    } = this.props;

    // For each card, we want to render the TagValueFilter component
    return (
      <span
        className="card pt-3 p-2 tagfilter-container"
        style={{
          backgroundColor: tags[tagName].color,
        }}
      >
        <div className="card-title">{ tagName }</div>
        <span className="card tagfilter-card">
          <span className="card-body">
            <TagValueFilter
              tags={tags}
              tagName={tagName}
              onFilterChanged={onFilterChanged}
            />
          </span>
        </span>
      </span>
    );
  }
}

TagFilter.propTypes = {
  // Object that has all of the tags
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  // string for the tagName being rendered
  tagName: PropTypes.string.isRequired,
};

export default TagFilter;
