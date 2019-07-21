import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CopyButton from './CopyButton';

class EmailSubject extends Component {
  render() {
    // deconstruct the state
    const { subject, onInputChange } = this.props;

    return (
      <div className="input-group mb-3 bg-info p-2 rounded">
        <div className="input-group-prepend">
          <span className="input-group-text bg-info border-0 font-weight-bold text-white rounded" id="basic-addon3">Subject: </span>
        </div>
        <input
          type="text"
          className="form-control rounded text-truncate"
          aria-describedby="basic-addon3"
          value={subject}
          onChange={onInputChange}
        />
        <div className="input-group-append" id="button-addon4">
          <CopyButton text={subject} />
        </div>
      </div>
    );
  }
}

EmailSubject.propTypes = {
  // the subject of the email
  subject: PropTypes.string.isRequired,
  // onInputChange function that modifies the subject in parent component
  onInputChange: PropTypes.func.isRequired,
};

export default EmailSubject;
