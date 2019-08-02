import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CopyButton from './CopyButton';

class EmailSubject extends Component {
  render() {
    // deconstruct the state
    const { subject } = this.props;

    return (
      <div className="email-subject-container input-group mb-3 bg-info p-2 rounded">
        <div className="input-group-prepend">
          <span
            className="input-group-text bg-info border-0 font-weight-bold text-white rounded"
            id="basic-addon3"
          >
            Subject:
          </span>
        </div>
        <input
          type="text"
          className="form-control rounded text-truncate"
          aria-describedby="basic-addon3"
          value={subject}
          readOnly
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
};

export default EmailSubject;
