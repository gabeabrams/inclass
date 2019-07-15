import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppCreatorTag.css';

class AppCreatorTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  async componentDidMount() {
    const { creator } = this.props;
    if (creator.length === 1) {
      this.setState({
        message: `by ${creator[0]}`,
      });
    } else if (creator.length === 2) {
      this.setState({
        message: `by ${creator[0]} and ${creator[1]}`,
      });
    } else {
      let newMessage = `by ${creator[0]}`;
      for (let i = 1; i < creator.length; i++) {
        newMessage = newMessage.concat(
          (i === creator.length - 1)
            ? `, and ${creator[i]}`
            : `, ${creator[i]}`
        );
      }
      this.setState({
        message: newMessage,
      });
    }
  }

  render() {
    const { message } = this.state;
    return (
      <span className="app-creator-tag-label">
        {message}
      </span>
    );
  }
}

AppCreatorTag.propTypes = {
  // array of strings that are the creators for the app
  creator: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppCreatorTag;
