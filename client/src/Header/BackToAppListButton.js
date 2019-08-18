import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import './BackToAppListButton.css';

class BackToAppListButton extends Component {
  render() {
    // Deconstruct props
    const { onBackButtonClicked } = this.props;

    // Return the button
    return (
      <div className="backtoapplistbutton-container">
        <button
          type="button"
          className="btn btn-outline-secondary p-0"
          onClick={() => {
            onBackButtonClicked();
          }}
        >
          <div className="backtoapplistbutton-container">
            <div className="backtoapplistbutton-button-container mr-3">
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
            <span className="text-white text-nowrap font-weight-bold">Back</span>
            <span className="text-white text-nowrap font-weight-bold ml-1 d-none d-sm-block">to App List</span>
          </div>
        </button>
      </div>
    );
  }
}

BackToAppListButton.propTypes = {
  // Function that goes back to App list when button clicked
  onBackButtonClicked: PropTypes.func.isRequired,
};

export default BackToAppListButton;
