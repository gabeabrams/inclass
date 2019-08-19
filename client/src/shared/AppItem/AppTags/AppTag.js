import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppTag.css';

class AppTag extends Component {
  render() {
    // deconstruct props
    const {
      tagKey,
      tagValue,
      tagColor,
    } = this.props;
    // if it is uncategorized, it is not displayed
    if (tagValue === 'other/uncategorized') {
      return (null);
    }
    return (
      <div className="apptag-single-tag text-light">
        <span
          className="badge apptag-left-side"
          style={{
            backgroundColor: tagColor,
          }}
        >
          {tagKey}
        </span>
        <span
          className="badge apptag-right-side bg-secondary"
        >
          {tagValue}
        </span>
      </div>
    );
  }
}

AppTag.propTypes = {
  // the tag name
  tagKey: PropTypes.string.isRequired,
  // the tag value
  tagValue: PropTypes.string.isRequired,
  // the color of the tag
  tagColor: PropTypes.string.isRequired,
};

export default AppTag;
