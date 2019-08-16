import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilterCheckBox from './TagValueFilterCheckBox';
import TagValueFilterCount from './TagValueFilterCount';

// Import css
import './style.css';

class TagValueFilter extends Component {
  render() {
    const {
      tags,
      tagName,
    } = this.props;

    let uncategorizedFilterTag;

    const tagValueElems = Object.keys(tags[tagName].values).map((tagValue) => {
      // Skip over other/uncategorized tag and add it manually to the end
      if (tagValue === 'other/uncategorized') {
        uncategorizedFilterTag = (
          <div className="tagvaluefilter-container">
            <TagValueFilterCheckBox
              key={tagValue}
              isChecked={tags[tagName].values[tagValue]}
              label={tagValue}
            />
            <TagValueFilterCount />
          </div>
        );
      } else {
        return (
          <div className="tagvaluefilter-container">
            <TagValueFilterCheckBox
              key={tagValue}
              isChecked={tags[tagName].values[tagValue]}
              label={tagValue}
            />
            <TagValueFilterCount />
          </div>
        );
      }
    });

    return (
      <div>
        {tagValueElems}
        {uncategorizedFilterTag}
      </div>
    );
  }
}

TagValueFilter.propTypes = {
  // The tags object for filtering
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  // The name of this given tag so we can identify which tag to render
  tagName: PropTypes.string.isRequired,
};

export default TagValueFilter;
