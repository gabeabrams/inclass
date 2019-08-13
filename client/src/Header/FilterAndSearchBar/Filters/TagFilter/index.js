import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilter from './TagValueFilter';

// Import css
import './style.css';

// An indi
class TagFilter extends Component {
  render() {
    const {
      tags,
      tagName,
    } = this.props;

    // For each card, we want to render the TagValueFilter component
    return (
      <span
        className="card pt-3 p-2 tagfilter-container"
        style={{
          backgroundColor: tags[tagName].color,
        }}
      >
        { tagName }
        <span className="card tagfilter-card">
          <span className="card-body">
            <TagValueFilter tags={tags} tagName={tagName} />
          </span>
        </span>
      </span>
    );
  }
}

TagFilter.propTypes = {
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  tagName: PropTypes.string.isRequired,
};

export default TagFilter;
