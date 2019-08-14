import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Step.css';

class Step extends Component {
  render() {
    const { step, stepNum } = this.props;
    return (
      <div className={`step-${stepNum}`}>
        <span className="badge badge-secondary mr-2 ml-2">{stepNum}</span>
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
};

export default Step;
