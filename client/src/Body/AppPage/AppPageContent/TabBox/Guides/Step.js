import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Step.css';

class Step extends Component {
  render() {
    const { step, stepNum } = this.props;
    return (
      <div className="step-container font-weight-bold">
        <span className="badge badge-secondary mr-2 ml-2">{stepNum}</span>
        <span className="step-instructions">{step}</span>
      </div>
    );
  }
}

Step.propTypes = {
  step: PropTypes.string.isRequired,
  stepNum: PropTypes.number.isRequired,
};

export default Step;
