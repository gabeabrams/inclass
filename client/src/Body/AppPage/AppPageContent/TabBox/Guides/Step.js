import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Step.css';

/**
 * Renders each step of a guide. If there are more than 10 steps, the step
 *   numbers widen to accomodate
 */
class Step extends Component {
  render() {
    const { step, stepNum, greaterTen } = this.props;
    return (
      <div className="step-container" id={`step-${stepNum}`}>
        <span className={`step-badge badge badge-secondary ${greaterTen ? 'step-bigBadge' : ''}`}>{stepNum}</span>
        <span className="step-instructions font-weight-bold">{step}</span>
      </div>
    );
  }
}

Step.propTypes = {
  // the instruction
  step: PropTypes.string.isRequired,
  // the list number of the instruction
  stepNum: PropTypes.number.isRequired,
  greaterTen: PropTypes.bool,
};

Step.defaultProps = {
  greaterTen: false,
};
export default Step;
