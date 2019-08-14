import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilterCheckBox from './TagValueFilterCheckBox';
import TagValueFilterCount from './TagValueFilterCount';

class TagValueFilter extends Component {
  render() {
    const {
      tags,
      tagName,
    } = this.props;

    const tagValueElems = Object.keys(tags[tagName].values).map((tagValue) => {
      return (
        <TagValueFilterCheckBox
          key={tagValue}
          isChecked={tags[tagName].values[tagValue]}
          label={tagValue}
        />
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
