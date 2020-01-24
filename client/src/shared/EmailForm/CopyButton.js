import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CopyButton.css';

const STAGES = {
  NEVER_COPIED: 'never-copied',
  COPIED: 'copied',
  COPY_AGAIN: 'copy-again',
};

class CopyButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // If true, show text as "Copied"
      stage: STAGES.NEVER_COPIED,
    };
  }

  /**
   * Copy the prop passed in to the clipboard
   */
  copyText() {
    const { text } = this.props;
    // Create new element
    const elem = document.createElement('textarea');
    // Set its value to the text that we want copied
    elem.value = text;
    // Set non-editable to avoid focus and move outside of view
    elem.setAttribute('readonly', '');
    elem.style = { position: 'absolute', left: '-9999px' };
    // append it to the document
    document.body.appendChild(elem);
    // Select text inside element
    elem.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(elem);

    // Change button text
    this.setState({
      stage: STAGES.COPIED,
    }, () => {
      // Reset the text after some time
      setTimeout(() => {
        this.setState({
          stage: STAGES.COPY_AGAIN,
        });
      }, 2500);
    });
  }

  render() {
    const { stage } = this.state;

    let text;
    if (stage === STAGES.COPIED) {
      text = 'Copied';
    } else if (stage === STAGES.NEVER_COPIED) {
      text = 'Copy';
    } else {
      text = 'Copy Again';
    }

    return (
      <button
        type="button"
        className="CopyButton-button btn-clipboard"
        id="copybutton-text"
        onClick={() => { this.copyText(); }}
        disabled={stage === STAGES.COPIED}
      >
        {text}
      </button>
    );
  }
}

CopyButton.propTypes = {
  // the text to copy to clipboard
  text: PropTypes.string.isRequired,
};

export default CopyButton;
