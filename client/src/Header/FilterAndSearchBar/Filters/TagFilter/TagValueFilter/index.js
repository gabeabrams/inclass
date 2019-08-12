import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilterCheckBox from './TagValueFilterCheckBox';
import TagValueFilterCount from './TagValueFilterCount';
import TagValueFilterLabel from './TagValueFilterLabel';

// Import styling

class TagValueFilter extends Component {
  render() {
    const {
      tags,
      tagName,
    } = this.props;

    const tagValueElements = Object.keys(tags[tagName].values).map((tagValue) => {
      return (
        <div>
          <TagValueFilterCheckBox isChecked={tagValue} />
        </div>
      );
    });

    return (
      <div>
        {tagValueElements}
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
