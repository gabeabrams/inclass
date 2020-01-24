import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CopyButton from './CopyButton';

import './EmailSubject.css';

class EmailSubject extends Component {
  render() {
    // deconstruct the state
    const { subject } = this.props;

    return (
      <div className="EmailSubject-container bg-info">
        <div className="EmailSubject-label">
          Subject:
        </div>
        <div className="EmailSubject-box">
          {subject}
        </div>
        <div className="EmailSubject-copy">
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
