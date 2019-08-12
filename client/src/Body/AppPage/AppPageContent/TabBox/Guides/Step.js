import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Step extends Component {
  render() {
    const { step, stepNum } = this.props;
    return (
      <div className="step-container">
        <span className="badge badge-secondary mr-2 ml-2">{stepNum}</span>
        {step}
      </div>
    );
  }
}

Step.propTypes = {
  step: PropTypes.string.isRequired,
  stepNum: PropTypes.number.isRequired,
};

export default Step;
