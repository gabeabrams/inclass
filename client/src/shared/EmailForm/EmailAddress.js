import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailAddress extends Component {
  render() {
    // deconstruct props
    const { address, onClick, onInputChange } = this.props;

    return (
      <div className="input-group mb-1 bg-info p-2 rounded">
        <div className="input-group-prepend">
          <span className="input-group-text bg-info border-0 font-weight-bold text-white rounded" id="basic-addon3">Send to: </span>
        </div>
        <input
          type="text"
          className="form-control rounded text-primary"
          aria-describedby="basic-addon3"
          value={address}
          onChange={onInputChange}
          onClick={onClick}
        />
      </div>
    );
  }
}

EmailAddress.propTypes = {
  // the email address to send to
  address: PropTypes.string.isRequired,
  // onClick function that sends address and subject out
  onClick: PropTypes.func.isRequired,
  // onInputChange function that modifies the address in parent component
  onInputChange: PropTypes.func.isRequired,
};

export default EmailAddress;
