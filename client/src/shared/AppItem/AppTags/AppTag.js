import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppTag extends Component {
  render() {
    // deconstruct props
    const { key, value } = this.props;
    return (
      <div className="alert alert-warning">
        {'key is ' + key + 'value is ' + value}
      </div>
    );
  }
}
AppTag.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default AppTag;
