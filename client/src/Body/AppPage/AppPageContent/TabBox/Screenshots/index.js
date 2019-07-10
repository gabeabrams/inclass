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
      toRender.push(<Screenshot screenshot={screenshot}/>);
    });
    return toRender;
  }
  render() {
    // get screenshots from the app
    let toRender = [];
    toRender = this.getScreenshots(toRender);
    return (
      toRender
    );
  }
}
Screenshots.propTypes = {
  // The app whose screenshots we want
  app: PropTypes.shape({
    // Array of screenshots in the app
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string
      })
    )
  }).isRequired,
};

export default Screenshots;
