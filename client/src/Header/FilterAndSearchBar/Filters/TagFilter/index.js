import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components

// Import css

// An indi
class TagFilter extends Component {
  render() {
    const {
      tag,
      color,
    } = this.props;

    const backgroundColor = color;
    console.log('hi');
    console.log(backgroundColor);

    return (
      <span className="m-3">
        <span className="card">
          <span className="card-body">
            <h5 className="card-title">{ tag }</h5>
            {/* TODO: individual TagValueFilter components */}
            <p className="card-text">TagValueFilter components eventually</p>
          </span>
        </span>
      </span>
    );
  }
}

TagFilter.propTypes = {
  tag: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TagFilter;
