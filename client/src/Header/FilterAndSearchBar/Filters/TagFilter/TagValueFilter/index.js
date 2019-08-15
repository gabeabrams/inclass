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

    const tagValueElems = Object.keys(tags[tagName].values).map((tagValue) => {
      return (
        <div className="tagvaluefilter-container">
          <div className="tagvaluefilter-checkboxes">
            <TagValueFilterCheckBox
              key={tagValue}
              isChecked={tags[tagName].values[tagValue]}
              label={tagValue}
            />
          </div>
          <div className="tagvaluefilter-count">
            <TagValueFilterCount />
          </div>
        </div>
      );
    });

    return (
      <div>
        {tagValueElems}
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
