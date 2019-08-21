// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageBody extends Component {
  render() {
    const { messageBody } = this.props;
    return (
      <div className="message-body-container">
        { messageBody }
      </div>
    );
  }
}

MessageBody.propTypes = {
  /* the body of the modal */
  messageBody: PropTypes.node.isRequired,
};

export default MessageBody;
