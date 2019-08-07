import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Step from './Step';

class Guide extends Component {
  render() {
    // deconstruct props
    const { guide } = this.props;
    const { title, steps } = guide;

    const stepsToRender = steps.map((step) => {
      return (
        <div className="steps-elem">
          <Step step={step} />
        </div>
      );
    });

    return (
      <div className="card border-dark mb-3">
        <div className="card-header bg-secondary text-light border-secondary">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
        <div className="steps-container">
          {stepsToRender}
        </div>
      </div>
    );
  }
}

Guide.propTypes = {
  guide: PropTypes.shape({
    title: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
  }).isRequired,
};

export default Guide;
