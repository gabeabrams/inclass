import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AppListStatusBar.css';

class AppListStatusBar extends Component {
  constructor(props) {
    super(props);

    // destructure props
    const { appCount } = this.props;

    const message = (
      appCount === 0
        ? 'There are no matching apps. Please broaden your search criteria'
        : `${appCount} apps match your search`
    );

    this.state = {
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
  // TODO: comment
  appCount: PropTypes.number,
};

AppListStatusBar.defaultProps = {
  // TODO: comment
  appCount: 0,
};

export default AppListStatusBar;
