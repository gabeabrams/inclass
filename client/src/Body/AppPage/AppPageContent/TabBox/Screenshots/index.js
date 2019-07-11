// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?
import Screenshot from './Screenshot';

class Screenshots extends Component {
  render() {
    // get screenshots from the app
    const toRender = [];
    const { app } = this.props;
    const { screenshots } = app;
    screenshots.forEach((screenshot) => {
      toRender.push(<div className="screenshots-elem"><Screenshot screenshot={screenshot} /></div>);
    });
    return (
      <div className="screenshots-container">
        {toRender}
      </div>
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
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Screenshots;
