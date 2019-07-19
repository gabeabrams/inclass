import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CopyButton from './CopyButton';

class EmailSubject extends Component {
  constructor(props) {
    super(props);

    // deconstruct the props
    const { subject } = this.props;

    this.state = {
      // the current content inside the subject input
      currentSubject: subject,
    };
    // make sure 'this' binding is unchanged when calling onInputChange
    this.onInputChange = this.onInputChange.bind(this);
  }

  // reset the state as user input changes, rerenders the page
  onInputChange(event) {
    this.setState({
      currentSubject: event.target.value,
    });
  }

  render() {
    // deconstruct the state
    const { currentSubject } = this.state;
    return (
      <div className="input-group mb-3 bg-info p-2 rounded">
        <div className="input-group-prepend">
          <span className="input-group-text bg-info border-0 font-weight-bold text-white rounded" id="basic-addon3">Subject: </span>
        </div>
        {/* input field saves current subject to state */}
        <input
          type="text"
          className="form-control rounded text-truncate"
          aria-describedby="basic-addon3"
          value={currentSubject}
          onChange={this.onInputChange}
        />
        <div className="input-group-append" id="button-addon4">
          <CopyButton text={currentSubject} />
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