import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppTag extends Component {
  render() {
    // deconstruct props
    const { tagKey, tagValue } = this.props;
    return (
      <div className="appTag">
        {'key is ' + tagKey + ' value is ' + tagValue}
      </div>
    );
  }
}
AppTag.propTypes = {
  tagKey: PropTypes.string.isRequired,
  tagValue: PropTypes.string.isRequired,
};
export default AppTag;
