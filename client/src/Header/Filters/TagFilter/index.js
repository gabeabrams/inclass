import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilter from './TagValueFilter';
import TagFilterResetButton from './TagFilterResetButton';

// Import css
import './style.css';

class TagFilter extends Component {
  render() {
    const {
      tags,
      tagName,
      onFilterChanged,
      counts,
    } = this.props;

    // For each card, we want to render the TagValueFilter component
    return (
      <div
        className="card p-2 tagfilter-container"
        style={{
          backgroundColor: tags[tagName].color,
        }}
      >
        <div className="tagfilter-title card-header">{ tagName }</div>
        <div
          className="card-body tagfilter-card"
          style={{
            backgroundColor: 'white',
          }}
        >
          <div
            className="tagfilter-cardbody"
            style={{
              backgroundColor: 'white',
            }}
          >
            <TagValueFilter
              tags={tags}
              tagName={tagName}
              onFilterChanged={onFilterChanged}
              counts={counts}
            />
            <TagFilterResetButton
              onClick={() => {
                onFilterChanged(false, tagName);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

TagFilter.propTypes = {
  // Object that has all of the tags
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  // string for the tagName being rendered
  tagName: PropTypes.string.isRequired,
  // Handler for filtering by checkboxes and updating state
  onFilterChanged: PropTypes.func.isRequired,
  // Mapping to tagValues' app counts
  counts: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TagFilter;
