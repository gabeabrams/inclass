import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppTag from './AppTag';
import './style.css';

class AppTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsArray: [],
    };
  }

  async componentDidMount() {
    // deconstruct props
    const { tags } = this.props;
    // construct tagsArray state
    const newTagsArray = [];
    Object.keys(tags).forEach((tagName) => {
      tags[tagName].forEach((tagValue) => {
        newTagsArray.push([tagName, tagValue]);
      });
    });
    this.setState({
      tagsArray: newTagsArray,
    });
  }

  render() {
    const { tagsArray } = this.state;
    const tagsList = tagsArray.map((tagPair) => {
      return (
        <AppTag tagKey={tagPair[0]} tagValue={tagPair[1]} />
      );
    });
    return (
      <div className="tagsList">
        {tagsList}
      </div>
    );
  }
}
AppTags.propTypes = {
  tags: PropTypes.objectOf(PropTypes.array).isRequired,
};
export default AppTags;
