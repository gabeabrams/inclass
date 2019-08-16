import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Step.css';

class Step extends Component {
  render() {
    const { step, stepNum, greaterTen } = this.props;
    return (
      <div className="step-container" id={`step-${stepNum}`}>
        <span className="badge badge-secondary">{stepNum}</span>
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
