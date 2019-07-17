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
    // construct the message depending on the number of creator
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
    const { dark } = this.props;
    const className = (
      dark
        ? 'badge bg-secondary text-dark p-2'
        : 'badge badge-light text-dark p-2'
    );
    return (
      <span className={className} id="appcreatortag-box">
        {message}
      </span>
    );
  }
}

AppCreatorTag.propTypes = {
  // array of strings that are the creators for the app
  creator: PropTypes.arrayOf(PropTypes.string).isRequired,
  // whether the background is dark or light
  dark: PropTypes.bool,
};

AppCreatorTag.defaultProps = {
  // if not passed in, assume to render the appItem light
  dark: undefined,
};

export default AppCreatorTag;
