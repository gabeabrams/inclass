import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailAddress extends Component {
  constructor(props) {
    super(props);

    // deconstruct props
    const { address } = this.props;

    this.state = {
      // the current content inside the address input
      currentAddress: address,
    };
    // make sure 'this' binding is unchanged when calling onInputChange
    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // reset the state as user input changes, rerenders the page
  onInputChange(event) {
    this.setState({
      currentAddress: event.target.value,
    });
  }

  onClick() {
    const { currentAddress } = this.state;
    const { subject } = this.props;
    const send = `mailto:${currentAddress}?subject=${encodeURIComponent(subject)}`;
    window.open(`${send}`);
  }

  render() {
    // deconstruct props
    const { currentAddress } = this.state;
    return (
      <div className="input-group mb-1 bg-info p-2 rounded">
        <div className="input-group-prepend">
          <span className="input-group-text bg-info border-0 font-weight-bold text-white rounded" id="basic-addon3">Send to: </span>
        </div>
        <input
          type="text"
          className="form-control rounded text-primary"
          aria-describedby="basic-addon3"
          value={currentAddress}
          onChange={this.onInputChange}
          onClick={this.onClick}
        />
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