import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AppListStatusBar.css';

class AppListStatusBar extends Component {
  constructor(props) {
    super(props);

    // destructure props
    const { appCount } = this.props;

    let message;
    if (appCount === 0) {
      message = 'There are no matching apps. Please broaden your search criteria';
    } else if (appCount === 1) {
      message = `${appCount} app matches your search`;
    } else {
      message = `${appCount} apps match your search`;
    }

    this.state = {
      // the message to display on the status bar
      message,
    };
  }

  render() {
    // deconstruct state
    const { message } = this.state;
    return (
      <div className="app-list-status-bar-container font-italic">
        {message}
      </div>
    );
  }
}

AppListStatusBar.propTypes = {
  // determines the number of apps we display in the message
  appCount: PropTypes.number,
};

AppListStatusBar.defaultProps = {
  // default is no apps matching
  appCount: 0,
};

export default AppListStatusBar;
