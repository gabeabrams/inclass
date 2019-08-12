import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components

// Import css
import './style.css';

// An indi
class TagFilter extends Component {
  render() {
    const {
      tags,
      tagName,
    } = this.props;

    // For each card, we want to render the TagValueFilter component
    return (
      <span
        className="card pt-3 p-2 tagfilter-container"
        style={{
          backgroundColor: tags[tagName].color,
        }}
      >
        <div className="card tagfilter-card">
          <span className="card-body">
            <h5 className="card-title">{ tagName }</h5>
            {/* TODO: individual TagValueFilter components */}
            <p className="card-text">TagValueFilter components eventually</p>
          </span>
        </div>
      </span>
    );
  }
}

TagFilter.propTypes = {
  tags: PropTypes.objectOf(PropTypes.object).isRequired,
  tagName: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TagFilter;
