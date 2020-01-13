import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppTag from './AppTag';
import './style.css';

class AppTags extends Component {
  constructor(props) {
    super(props);

    // deconstruct props
    const { tags, tagColors } = this.props;

    // construct tagsArray state
    const newTagsArray = [];

    // put array of options to pass into each tagItem into an array
    Object.keys(tags).forEach((tagName) => {
      tags[tagName].forEach((tagValue) => {
        newTagsArray.push([tagName, tagValue, tagColors[tagName].color]);
      });
    });

    this.state = {
      // array of arrays that holds value for tagName, tagValue, and tagColor
      tagsArray: newTagsArray,
    };
  }

  render() {
    // deconstruct the state
    const { tagsArray } = this.state;

    // map each array elem into AppTag element
    const tagsList = tagsArray
      .filter((tagPair) => {
        return (tagPair[1] !== 'other/uncategorized');
      })
      .map((tagPair) => {
        const tagUniqueKey = `${tagPair[0]}=>${tagPair[1]}`;
        return (
          <AppTag
            key={tagUniqueKey}
            tagKey={tagPair[0]}
            tagValue={tagPair[1]}
            tagColor={tagPair[2]}
          />
        );
      });
    return (
      <div className="apptags-tags-list">
        {tagsList}
      </div>
    );
  }
}

AppTags.propTypes = {
  // consists of tagName => tagValue mapping
  tags: PropTypes.objectOf(PropTypes.array).isRequired,
  // color of the tag
  tagColors: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AppTags;
