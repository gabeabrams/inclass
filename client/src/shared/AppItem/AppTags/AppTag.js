import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppTag.css';

class AppTag extends Component {
  render() {
    // deconstruct props
    const { tagKey, tagValue, tagColor } = this.props;
    return (
      <div className="singleTag">
        <span
          className="key-label"
          style={{ backgroundColor: tagColor }}
        >
          {tagKey}
        </span>
        <span
          className="value-label"
          style={{ backgroundColor: '#535252' }}
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
