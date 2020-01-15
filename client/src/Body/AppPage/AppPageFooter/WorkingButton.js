import React, { Component } from 'react';

import './WorkingButton.css';

class WorkingButton extends Component {
  render() {
    return (
      <button
        type="button"
        id="working-button"
        className="btn btn-light btn-lg font-weight-bold pl-4 pr-4 ml-1"
        disabled
      >
        Working...
      </button>
    );
  }
}

export default WorkingButton;
