import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppListStatusBar extends Component {
  constructor(props) {
    super(props);
    // ...
  }

  render() {
    // Message: 26 apps match your search
    const { appCount } = this.props;

    return (
      <div className="alert alert-warning">
        No status bar
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
