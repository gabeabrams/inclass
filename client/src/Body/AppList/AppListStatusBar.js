import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppListStatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  async componentDidMount() {
    // destructure props
    const { appCount } = this.props;
    const newMessage = (
      appCount === 0
        ? 'There are no matching apps. Please broaden your search criteria'
        : `${appCount} apps match your search`
    );
    this.setState({
      message: newMessage,
    });
  }

  render() {
    // deconstruct state
    const { message } = this.state;
    return (
      <div className="alert alert-warning">
        {message}
      </div>
    );
  }
}
AppListStatusBar.propTypes = {
  appCount: PropTypes.number,
};
AppListStatusBar.defaultProps = {
  appCount: 0,
};
export default AppListStatusBar;
