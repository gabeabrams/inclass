// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  /**
   * Render the Modal
   */
  render() {
    const {
      title,
      footer,
      onClose,
      children,
      titleBackgroundColor,
    } = this.props;

    return (
      <div>
        <div
          className="modal-backdrop"
          style={{
            opacity: 0.5,
          }}
        />
        <div className="modal d-block" id="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: titleBackgroundColor,
                }}
              >
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  maxHeight: '70vh',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                {children}
              </div>
              {footer && (
                <div className="modal-footer">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  /* The title of the modal */
  title: PropTypes.node.isRequired,
  /* The color of the title */
  titleBackgroundColor: PropTypes.string,
  /* The footer of the modal */
  footer: PropTypes.node,
  /* Function to call when the modal is closed */
  onClose: PropTypes.func.isRequired,
  /* the children contains the body */
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  /* the default modal does not have a footer */
  footer: null,
  /* the default title background is transparent */
  titleBackgroundColor: 'white',
};

export default Modal;
