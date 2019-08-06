// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FailureReason extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className="failure-reason-container">
        { message }
      </div>
    );
  }
}

FailureReason.propTypes = {
  /* the failure reason to display */
  message: PropTypes.string.isRequired,
};

export default FailureReason;
