import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EmailAddress.css';

class EmailAddress extends Component {
  render() {
    // deconstruct props
    const { address, subject } = this.props;

    return (
      <div className="EmailAddress-container bg-info">
        <div className="EmailAddress-label">
          Send to:
        </div>
        <div className="EmailAddress-box">
          <a
            className="emailLink"
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:${address}?subject=${encodeURIComponent(subject)}`}
          >
            {address}
          </a>
        </div>
      </div>
    );
  }
}

EmailAddress.propTypes = {
  // the email address to send to
  address: PropTypes.string.isRequired,
  // the subject of the email
  subject: PropTypes.string.isRequired,
};

export default EmailAddress;
