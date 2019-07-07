import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppTags extends Component {
  render() {
    // deconstruct props
    const { tags } = this.props;
    console.log(tags);
    return (
      <div className="alert alert-warning">
      </div>
    );
  }
}
AppTags.propTypes = {
  tags: PropTypes.objectOf(PropTypes.array).isRequired,
};
export default AppTags;
