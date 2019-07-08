import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppTag.css';

class AppTag extends Component {
  render() {
    // deconstruct props
    const { tagKey, tagValue } = this.props;
    return (
      <div className="alert alert-secondary">
        <span className="key-label">{tagKey}</span>
        <span className="value-label">{tagValue}</span>
      </div>
    );
  }
}
AppTag.propTypes = {
  tagKey: PropTypes.string.isRequired,
  tagValue: PropTypes.string.isRequired,
};
export default AppTag;
