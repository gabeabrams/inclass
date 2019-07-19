import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CopyButton extends Component {
  // copy the prop passed in to the clipboard
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
  }

  render() {
    return (
      <button
        type="button"
        className="btn-clipboard rounded border-0 bg-secondary text-white font-weight-bold"
        id="copybutton-text"
        onClick={() => { this.copyText(); }}
      >
          Copy
      </button>
    );
  }
}

CopyButton.propTypes = {
  // the text to copy to clipboard
  text: PropTypes.string.isRequired,
};

export default CopyButton;