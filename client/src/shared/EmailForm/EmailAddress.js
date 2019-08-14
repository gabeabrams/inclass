import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailAddress extends Component {
  render() {
    // deconstruct props
    const { address, subject } = this.props;

    return (
      <div className="email-address-container input-group mb-1 bg-info p-2 rounded">
        <div className="input-group-prepend">
          <span
            className="input-group-text bg-info border-0 font-weight-bold text-white rounded"
            id="address_addon"
          >
              Send to:
          </span>
        </div>
        <div
          className="alert alert-light form-control rounded text-truncate p-1"
        >
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
