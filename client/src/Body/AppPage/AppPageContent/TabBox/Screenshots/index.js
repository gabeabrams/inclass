// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?
import Screenshot from './Screenshot';

class Screenshots extends Component {
  getScreenshots = (toRender) => {
    const { app } = this.props;
    const { screenshots } = app;
    screenshots.forEach((screenshot) => {
      toRender.push(<Screenshot screenshot/>);
    });
    return toRender;
  }
  render() {
    // get screenshots from the app
    let toRender = [];
    return (
      this.getScreenshots(toRender)
    );
  }
}
Screenshots.propTypes = {
  app: PropTypes.node.isRequired,
};

export default Screenshots;
