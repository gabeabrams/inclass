import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppTag extends Component {
  render() {
    // deconstruct props
    const { tagKey, tagValue } = this.props;
    return (
      <div className="alert alert-warning">
        <p>{'key is ' + tagKey + ' value is ' + tagValue}</p>
      </div>
    );
  }
}
AppTag.propTypes = {
  tagKey: PropTypes.string.isRequired,
  tagValue: PropTypes.string.isRequired,
};
export default AppTag;
