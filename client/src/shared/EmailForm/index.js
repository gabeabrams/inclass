import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import EmailAddress from './EmailAddress';
import EmailSubject from './EmailSubject';

import './style.css';

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
    // make sure 'this' binding is unchanged when calling onInputChange
    this.onAddressInputChange = this.onAddressInputChange.bind(this);
    this.onSubjectInputChange = this.onSubjectInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { address, subject } = this.state;
    const send = `mailto:${address}?subject=${encodeURIComponent(subject)}`;
    window.open(`${send}`);
  }

  // reset the state as user input changes, rerenders the page
  onAddressInputChange(event) {
    this.setState({
      address: event.target.value,
    });
  }

  // reset the subject in the state
  onSubjectInputChange(event) {
    this.setState({
      subject: event.target.value,
    });
  }

  render() {
    // deconstruct props
    const { address, subject } = this.state;

    return (
      <div className="emailform-container d-flex flex-column">
        <EmailAddress
          address={address}
          subject={subject}
          onInputChange={this.onAddressInputChange}
        />
        <EmailSubject
          subject={subject}
          onInputChange={this.onSubjectInputChange}
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
