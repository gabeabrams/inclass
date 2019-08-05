import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components

// Import css

class Filters extends Component {
  render() {
    // Deconstruct props
    const {
      tags,
    } = this.props;

    return (
      <div>This is the fake filter drawer</div>
    );
  }
}

Filters.propTypes = {
  tags: PropTypes.shape({
    // TODO: finish
  }).isRequired,
};
