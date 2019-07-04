import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppListStatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: (
        props.appCount === 0
          ? 'There are no matching apps. Please broaden your search criteria'
          : `${props.appCount} apps match your search`
      ),
    };
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
