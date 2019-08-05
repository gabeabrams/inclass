import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import EmailAddress from './EmailAddress';
import EmailSubject from './EmailSubject';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    // deconstruct props
    const { address, subject } = this.props;
    this.state = {
      // the address to send the email to
      address,
      // the subject of the email
      subject,
    };
  }

  render() {
    // deconstruct props
    const { address, subject } = this.state;

    return (
      <div className="emailform-container d-flex flex-column">
        <EmailAddress
          address={address}
          subject={subject}
        />
        <EmailSubject
          subject={subject}
        />
      </div>
    );
  }
}

EmailForm.propTypes = {
  // the email address to send to
  address: PropTypes.string.isRequired,
  // the subject of the email
  subject: PropTypes.string.isRequired,
};

export default EmailForm;
