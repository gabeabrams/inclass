// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageBody extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="message-body-container">
        {children}
      </div>
    );
  }
}

MessageBody.propTypes = {
  /* the body of the modal */
  children: PropTypes.node.isRequired,
};

export default MessageBody;
