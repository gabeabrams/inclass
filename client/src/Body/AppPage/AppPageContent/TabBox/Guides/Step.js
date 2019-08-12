import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Step extends Component {
  render() {
    const { step, stepNum } = this.props;
    return (
      <span className="badge">{stepNum}</span>
    );
  }
}

Step.propTypes = {
  step: PropTypes.string.isRequired,
  stepNum: PropTypes.number.isRequired,
};

export default Step;
